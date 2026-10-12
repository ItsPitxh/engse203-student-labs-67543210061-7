# AI_USAGE — LAB 06

บันทึกการใช้ AI ระหว่างทำงาน · **ใช้ AI ได้ แต่ต้องเป็นเจ้าของโค้ดที่ส่ง**

> ผู้สอนจะสุ่มถามจากโค้ดที่ส่ง — ถ้าอธิบายไม่ได้ คะแนนส่วนนั้นจะถูกทบทวน

---

## ครั้งที่ 1

**ถามอะไร**
ให้ Claude ช่วย implement TODO ทั้งหมดใน starter ของ LAB 06 (CP01–CP05, CP07, CP08 และ Challenge)

**AI ตอบว่าอย่างไร (สรุปสั้น)**
Claude แบ่งงานเป็น 4 ส่วน:
1. `services/requestService.js` — `findAll`/`findById`/`create`/`updateStatus`/`remove` + ฟังก์ชัน `persist()` ที่เขียน `data/initialRequests.json` ลงดิสก์แบบ fire-and-forget (CP08)
2. `controllers/requestController.js` — ตัดสิน status code (200/201/204/400/404) จากผลที่ service คืนมา
3. middleware — `logger` (ใช้ `res.on('finish')` + `Date.now()`), `validateRequest` (ตรวจ 5 field + สร้าง array `details`), `errorHandler` + `notFound` (ตอบ JSON ไม่หลุด stack trace)
4. `routes/requestRoutes.js` + `app.js` — ประกาศ route แบบ path คงที่มาก่อน `:id`, ใส่ middleware ก่อน route, ปิดท้ายด้วย `notFound` → `errorHandler`

**ใช้ส่วนไหน / แก้เองตรงไหน**
- ใช้ทั้งหมดเป็นจุดเริ่มต้น
- ส่วนที่ควรเข้าใจและอธิบายได้เอง:
  - ทำไม `express.json()` ต้องมาก่อน route POST
  - ทำไม `notFound` และ `errorHandler` ต้องอยู่ท้ายสุด
  - ทำไม POST ตอบ 201 ไม่ใช่ 200, DELETE ตอบ 204 ไม่ใช่ 200
  - ทำไมใช้ `structuredClone()` ใน `findAll`/`findById`/`create`/`updateStatus`
  - ทำไม `errorHandler` ต้องมี 4 พารามิเตอร์ (`err, req, res, next`)
  - ทำไม `persist()` ไม่ `await` (ไม่อยากให้ response ช้าตามดิสก์)

**เข้าใจโค้ดที่ได้มาไหม** ☒ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## ครั้งที่ 2

**ถามอะไร**
—

**AI ตอบว่าอย่างไร (สรุปสั้น)**
—

**ใช้ส่วนไหน / แก้เองตรงไหน**
—

**เข้าใจโค้ดที่ได้มาไหม** ☐ เข้าใจทั้งหมด ☐ เข้าใจบางส่วน ☐ ยังไม่เข้าใจ

---

## สรุป

- **ส่วนที่เขียนเองทั้งหมด:** โครงสร้าง starter และ `scripts/check-project.mjs` (มาจากอาจารย์)
- **ส่วนที่ AI ช่วย:** โค้ดใน TODO ทุกจุด (service, controller, middleware, routes, app.js) + persistence (CP08)
- **ส่วนที่ยังไม่มั่นใจ:** —
