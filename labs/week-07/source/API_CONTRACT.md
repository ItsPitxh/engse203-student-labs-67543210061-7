# Campus Service API — Contract v2.0.0

**Base URL (dev):** `http://localhost:3001`
**CORS Allowed Origin (dev):** `http://localhost:5173`
**Content-Type:** `application/json; charset=utf-8` (ทั้ง request และ response)
**Encoding:** UTF-8 (รองรับข้อความไทย)

## Resource schema — `Request`

| field | type | required | notes |
|---|---|---|---|
| `id` | string | server-assigned | ขึ้นต้นด้วย `REQ-` ไม่ซ้ำ |
| `requesterName` | string | ✅ | อย่างน้อย 2 ตัวอักษร |
| `requestType` | string | ✅ | หนึ่งใน: `แจ้งซ่อม` · `บริการบัญชีผู้ใช้` · `ขอใช้อุปกรณ์` · `อื่น ๆ` |
| `location` | string | ✅ | ไม่ว่าง |
| `details` | string | ✅ | อย่างน้อย 10 ตัวอักษร |
| `priority` | string | ✅ | หนึ่งใน: `normal` · `urgent` |
| `status` | string | server-managed | หนึ่งใน: `pending` · `in-progress` · `completed` (เริ่มต้น `pending`) |

## Error schema

```json
{
  "error": "<ข้อความสำหรับผู้ใช้>",
  "details": ["<รายละเอียดแต่ละข้อ>", "..."]
}
```
`details` ปรากฏเฉพาะกรณี validation 400

---

## 1. GET `/api/requests`

ดึงรายการคำร้องทั้งหมด (รองรับ query filter)

### Query parameters
| name | type | notes |
|---|---|---|
| `status` | string | ถ้าระบุ จะกรองเฉพาะ `status` นั้น เช่น `?status=pending` |

### Response — 200 OK
```json
[
  {
    "id": "REQ-001",
    "requesterName": "สมชาย ใจดี",
    "requestType": "แจ้งซ่อม",
    "location": "ห้องปฏิบัติการ 301",
    "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
    "priority": "urgent",
    "status": "pending"
  }
]
```

### cURL
```
curl http://localhost:3001/api/requests
curl 'http://localhost:3001/api/requests?status=pending'
```

---

## 2. GET `/api/requests/:id`

ดึงคำร้องรายการเดียว

### Path parameters
| name | type |
|---|---|
| `id` | string (`REQ-...`) |

### Response — 200 OK
```json
{
  "id": "REQ-001",
  "requesterName": "สมชาย ใจดี",
  "requestType": "แจ้งซ่อม",
  "location": "ห้องปฏิบัติการ 301",
  "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
  "priority": "urgent",
  "status": "pending"
}
```

### Response — 404 Not Found
```json
{ "error": "ไม่พบคำร้องรหัส REQ-xxx" }
```

### cURL
```
curl http://localhost:3001/api/requests/REQ-001
```

---

## 3. POST `/api/requests`

สร้างคำร้องใหม่

### Request body
```json
{
  "requesterName": "ทดสอบ ระบบ",
  "requestType": "แจ้งซ่อม",
  "location": "C3-401",
  "details": "รายละเอียดยาวพอสมควรจริง",
  "priority": "normal"
}
```
ห้ามส่ง `id` หรือ `status` — เซิร์ฟเวอร์เป็นผู้กำหนดเอง

### Response — 201 Created
```json
{
  "id": "REQ-MV4X8USK-WRBX",
  "requesterName": "ทดสอบ ระบบ",
  "requestType": "แจ้งซ่อม",
  "location": "C3-401",
  "details": "รายละเอียดยาวพอสมควรจริง",
  "priority": "normal",
  "status": "pending"
}
```

### Response — 400 Bad Request
```json
{
  "error": "ข้อมูลคำร้องไม่ถูกต้อง",
  "details": [
    "ชื่อผู้แจ้งต้องมีอย่างน้อย 2 ตัวอักษร",
    "รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร"
  ]
}
```

### cURL
```
curl -X POST http://localhost:3001/api/requests \
  -H 'Content-Type: application/json' \
  -d '{"requesterName":"ทดสอบ ระบบ","requestType":"แจ้งซ่อม","location":"C3-401","details":"รายละเอียดยาวพอสมควรจริง","priority":"normal"}'
```

---

## 4. PUT `/api/requests/:id`

เปลี่ยนสถานะของคำร้อง

### Request body
```json
{ "status": "in-progress" }
```
`status` ต้องเป็นหนึ่งใน `pending`, `in-progress`, `completed`

### Response — 200 OK
```json
{
  "id": "REQ-001",
  "requesterName": "สมชาย ใจดี",
  "requestType": "แจ้งซ่อม",
  "location": "ห้องปฏิบัติการ 301",
  "details": "เครื่องปรับอากาศไม่ทำงานตั้งแต่เช้า",
  "priority": "urgent",
  "status": "in-progress"
}
```

### Response — 400 Bad Request
```json
{ "error": "สถานะต้องเป็น pending, in-progress หรือ completed" }
```

### Response — 404 Not Found
```json
{ "error": "ไม่พบคำร้องรหัส REQ-xxx" }
```

### cURL
```
curl -X PUT http://localhost:3001/api/requests/REQ-001 \
  -H 'Content-Type: application/json' \
  -d '{"status":"in-progress"}'
```

---

## 5. DELETE `/api/requests/:id`

ลบคำร้องถาวร

### Response — 204 No Content
ไม่มี body ส่งกลับ

### Response — 404 Not Found
```json
{ "error": "ไม่พบคำร้องรหัส REQ-xxx" }
```

### cURL
```
curl -X DELETE http://localhost:3001/api/requests/REQ-001
```

---

## HTTP status code summary

| Code | เมื่อไหร่ |
|---|---|
| 200 | ดึง/เปลี่ยนข้อมูลสำเร็จ |
| 201 | สร้างข้อมูลใหม่สำเร็จ (POST) |
| 204 | ลบสำเร็จ ไม่มี body |
| 400 | body/parameter ไม่ถูกต้อง |
| 404 | ไม่พบ resource หรือ path |
| 500 | เซิร์ฟเวอร์ขัดข้อง (ไม่คาดคิด) |

## CORS

เซิร์ฟเวอร์ตอบ header `Access-Control-Allow-Origin: <CORS_ORIGIN>` ให้กับ origin ที่ตั้งไว้ใน `.env` (ค่าเริ่มต้น `http://localhost:5173`) และรองรับ preflight `OPTIONS` ของ `POST`/`PUT`/`DELETE`

## Change log

- **v2.0.0** (Week 07) — เพิ่ม CORS, PUT `/api/requests/:id`, morgan logger, และ env-config
- **v1.0.0** (Week 06) — API พื้นฐาน CRUD ครบ
