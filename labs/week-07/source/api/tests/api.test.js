import { test, before, beforeEach, describe } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { createApp } from '../src/app.js';
import { loadSeed } from '../src/services/requestService.js';

let app;
before(async () => {
  await loadSeed();
  app = createApp();
});
beforeEach(async () => {
  // รีเซ็ตข้อมูลก่อนทุกเทสต์ กันผลข้างเคียง (POST/DELETE/PUT) ของเทสต์ก่อนหน้า
  await loadSeed();
});

const validRequest = {
  requesterName: 'ทดสอบ ระบบ',
  requestType: 'แจ้งซ่อม',
  location: 'C3-401',
  details: 'รายละเอียดยาวพอสมควรจริง',
  priority: 'normal',
};

describe('GET /api/requests', () => {
  test('คืนรายการทั้งหมด พร้อม status 200', async () => {
    const res = await request(app).get('/api/requests');
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.body), 'body ต้องเป็น array');
    assert.ok(res.body.length >= 3, 'seed ควรมีอย่างน้อย 3 รายการ');
  });

  test('กรองด้วย ?status=pending ได้ (ทุกรายการมี status=pending)', async () => {
    const res = await request(app).get('/api/requests?status=pending');
    assert.equal(res.status, 200);
    assert.ok(res.body.every((r) => r.status === 'pending'));
  });
});

describe('GET /api/requests/:id', () => {
  test('ถ้ามี id จริง ตอบ 200 และข้อมูลตรง', async () => {
    const res = await request(app).get('/api/requests/REQ-001');
    assert.equal(res.status, 200);
    assert.equal(res.body.id, 'REQ-001');
  });

  test('ถ้าไม่มี id นั้น ตอบ 404 พร้อม error', async () => {
    const res = await request(app).get('/api/requests/REQ-ไม่มีอยู่');
    assert.equal(res.status, 404);
    assert.ok(typeof res.body.error === 'string');
  });
});

describe('POST /api/requests', () => {
  test('body ถูกต้อง → 201 และ status เริ่มต้นเป็น pending', async () => {
    const res = await request(app).post('/api/requests').send(validRequest);
    assert.equal(res.status, 201);
    assert.equal(res.body.status, 'pending');
    assert.ok(res.body.id?.startsWith('REQ-'));
  });

  test('ข้อมูลไม่ครบ → 400 พร้อม details', async () => {
    const res = await request(app).post('/api/requests').send({ requesterName: 'x' });
    assert.equal(res.status, 400);
    assert.ok(Array.isArray(res.body.details) && res.body.details.length > 0);
  });

  test('priority ผิด → 400', async () => {
    const res = await request(app).post('/api/requests').send({ ...validRequest, priority: 'มั่ว' });
    assert.equal(res.status, 400);
  });
});

describe('PUT /api/requests/:id', () => {
  test('เปลี่ยนสถานะได้ → 200 และ status ใหม่', async () => {
    const res = await request(app).put('/api/requests/REQ-001').send({ status: 'in-progress' });
    assert.equal(res.status, 200);
    assert.equal(res.body.status, 'in-progress');
  });

  test('status ที่ไม่รองรับ → 400', async () => {
    const res = await request(app).put('/api/requests/REQ-001').send({ status: 'มั่ว' });
    assert.equal(res.status, 400);
  });
});

describe('DELETE /api/requests/:id', () => {
  test('มีอยู่ → 204 และหายจากรายการจริง', async () => {
    const del = await request(app).delete('/api/requests/REQ-003');
    assert.equal(del.status, 204);

    const list = await request(app).get('/api/requests');
    assert.ok(!list.body.some((r) => r.id === 'REQ-003'));
  });

  test('ไม่มีอยู่ → 404', async () => {
    const res = await request(app).delete('/api/requests/REQ-ไม่มี');
    assert.equal(res.status, 404);
  });
});

describe('CORS', () => {
  test('ตอบ Access-Control-Allow-Origin ให้ frontend origin ที่อนุญาต', async () => {
    const res = await request(app)
      .get('/api/requests')
      .set('Origin', 'http://localhost:5173');
    assert.equal(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });

  test('รองรับ preflight OPTIONS', async () => {
    const res = await request(app)
      .options('/api/requests')
      .set('Origin', 'http://localhost:5173')
      .set('Access-Control-Request-Method', 'POST');
    assert.ok(res.status === 204 || res.status === 200);
  });
});

describe('404 สำหรับ path ที่ไม่มี', () => {
  test('GET /api/ไม่มี-path-นี้ → 404 พร้อม JSON error', async () => {
    const res = await request(app).get('/api/not-found-xyz');
    assert.equal(res.status, 404);
    assert.ok(typeof res.body.error === 'string');
  });
});
