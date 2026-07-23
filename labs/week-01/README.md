# Week 01 — Developer Environment & GitHub Setup

## รุ่นใหม่

เปิด branch `lab/week-01` แล้วคัดลอก LAB01 starter จาก Course Repository เข้า `source/`

```bash
npm --prefix labs/week-01/source install
npm --prefix labs/week-01/source run start
npm --prefix labs/week-01/source run check
```

## รุ่นปัจจุบันที่มี repo เดิม

```bash
npm run import:source -- week-01 /path/to/old-lab01
```

ตั้ง `sourceOrigin` เป็น `migrated-repository` และบันทึก Original Repository URL/Commit SHA

## Evidence

- Node/npm/Git versions
- Screenshot `hello.js`
- Branch/commit/PR reflection

LAB01 ไม่มี web application ได้ ระบบจะสร้าง Evidence Report ให้อัตโนมัติ
