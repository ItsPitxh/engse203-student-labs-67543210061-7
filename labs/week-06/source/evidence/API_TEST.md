# API_TEST — LAB 06

**ชื่อ–รหัส:** Peachu  **วันที่ทดสอบ:** 2026-10-12

> บันทึก **ผลจริง** ที่เห็น จาก `npm run check` (ยิง request จริงด้วย supertest)

| # | Method | Path | ส่งอะไร | status ที่ควรได้ | status ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|---|
| 1 | GET | `/` | — | 200 | 200 | ✅ |
| 2 | GET | `/api/requests` | — | 200 | 200 (3 รายการ) | ✅ |
| 3 | GET | `/api/requests/REQ-001` | — | 200 | 200 | ✅ |
| 4 | GET | `/api/requests/REQ-999` | — | 404 | 404 | ✅ |
| 5 | POST | `/api/requests` | ข้อมูลครบถูกต้อง | 201 | 201 | ✅ |
| 6 | POST | `/api/requests` | `{"requesterName":"x"}` | 400 | 400 | ✅ |
| 7 | DELETE | `/api/requests/<id ที่เพิ่งสร้าง>` | — | 204 | 204 | ✅ |
| 8 | DELETE | `/api/requests/REQ-999` | — | 404 | 404 | ✅ |
| 9 | GET | `/api/unknown-path-xyz` | — | 404 | 404 (JSON มี field `error`) | ✅ |

## ⭐ Challenge

| # | Method | Path | status ที่ควรได้ | ที่ได้จริง | ผ่าน |
|---|---|---|---|---|---|
| 10 | GET | `/api/requests?status=pending` | 200 (กรองแล้ว) | 200 — ทุก record มี status=pending | ✅ |
| 11 | PUT | `/api/requests/REQ-001` + `{"status":"in-progress"}` | 200 | 200 — status เปลี่ยนเป็น in-progress | ✅ |
| 12 | PUT | `/api/requests/REQ-001` + `{"status":"มั่ว"}` | 400 | 400 | ✅ |

## ทดสอบว่าข้อมูลอยู่ถาวร (CP08)

| ขั้น | ทำอะไร | ผลที่เห็น |
|---|---|---|
| 1 | POST เพิ่มคำร้องใหม่ | ได้ 201 + id ขึ้นต้นด้วย `REQ-` (เช่น `REQ-MV4X...`) |
| 2 | GET ดูรายการ — เห็นคำร้องใหม่ไหม | เห็น — จำนวนเพิ่มเป็น 4 |
| 3 | Ctrl+C ปิดเซิร์ฟเวอร์ แล้วเปิดใหม่ | `data/initialRequests.json` ถูกเขียนทับโดย `persist()` ตอน create/update/delete |
| 4 | GET ดูรายการอีกครั้ง — คำร้องยังอยู่ไหม | ยังอยู่ (`loadSeed()` อ่าน snapshot ล่าสุดจาก file เดิม) |

## สรุปผล

- ผ่าน **9 / 9** (+ Challenge **3 / 3**)
- Checker รวม: **28 / 28** รายการ (ในห้อง 23/23 · ที่บ้าน 2/2 · Challenge 3/3)
- รายการที่ไม่ผ่าน: — ไม่มี —

## ตัวอย่าง log จาก terminal (logger middleware)

```
GET / → 200 (2ms)
GET /api/requests → 200 (0ms)
GET /api/requests/REQ-001 → 200 (1ms)
GET /api/requests/REQ-999 → 404 (0ms)
POST /api/requests → 201 (12ms)
POST /api/requests → 400 (1ms)
DELETE /api/requests/REQ-MV4X8USK-WRBX → 204 (1ms)
DELETE /api/requests/REQ-999 → 404 (1ms)
GET /api/unknown-path-xyz → 404 (0ms)
GET /api/requests?status=pending → 200 (0ms)
PUT /api/requests/REQ-001 → 200 (0ms)
PUT /api/requests/REQ-001 → 400 (0ms)
```

## Screenshot ที่ต้องแนบ (ยังไม่มี — ขอให้ Peachu จับหน้าจอเอง)

- [ ] `images/postman-get-200.png` — Postman แสดง GET `/api/requests` ตอบ 200 + array
- [ ] `images/postman-post-201.png` — Postman แสดง POST สำเร็จ ตอบ 201
- [ ] `images/terminal-logger.png` — terminal ที่รัน `npm run dev` และเห็น log ด้านบน
