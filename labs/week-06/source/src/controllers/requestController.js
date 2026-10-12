import * as service from '../services/requestService.js';

const VALID_STATUSES = ['pending', 'in-progress', 'completed'];

/**
 * controller รู้จัก req/res และเป็นคนตัดสิน status code
 * แต่ไม่จัดการข้อมูลเอง — ให้ service ทำ
 */

/**
 * W06-C1 · GET /api/requests  (+ ?status= สำหรับ Challenge)
 */
export function listRequests(req, res) {
  const { status } = req.query;
  const data = service.findAll(status ? { status } : {});
  res.status(200).json(data);
}

/**
 * W06-C2 · GET /api/requests/:id
 */
export function getRequest(req, res) {
  const found = service.findById(req.params.id);
  if (!found) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(found);
}

/**
 * W06-C3 · POST /api/requests  (ผ่าน validateRequest มาแล้ว)
 */
export function createRequest(req, res) {
  const created = service.create(req.body);
  res.status(201).json(created);
}

/**
 * W06-C4 (⭐) · PUT /api/requests/:id
 */
export function updateRequestStatus(req, res) {
  const { status } = req.body ?? {};
  if (!VALID_STATUSES.includes(status)) {
    return res.status(400).json({
      error: 'status ไม่ถูกต้อง',
      details: [`status ต้องเป็นหนึ่งใน ${VALID_STATUSES.join(', ')}`],
    });
  }
  const updated = service.updateStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(200).json(updated);
}

/**
 * W06-C5 · DELETE /api/requests/:id
 */
export function deleteRequest(req, res) {
  const removed = service.remove(req.params.id);
  if (!removed) {
    return res.status(404).json({ error: `ไม่พบคำร้องรหัส ${req.params.id}` });
  }
  res.status(204).end();
}
