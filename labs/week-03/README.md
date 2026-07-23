# Week 03 — Responsive Web UI & Form Interaction

## รุ่นใหม่

เปิด `lab/week-03` แล้วคัดลอก LAB03 starter จาก Course Repository เข้า `source/`

```bash
npm --prefix labs/week-03/source install
npm --prefix labs/week-03/source run build
npm run import:publish -- week-03 labs/week-03/source/dist
```

## รุ่นปัจจุบันที่มี repo เดิม

```bash
npm run import:source -- week-03 /path/to/old-lab03
```

ถ้าเป็น static site:

```bash
npm run import:publish -- week-03 labs/week-03/source
```

ตั้ง `sourceOrigin: "migrated-repository"` และบันทึก Original URL/Commit

## Manual Test

- Desktop และ mobile 375px
- Form invalid/valid
- Event interaction
- Console ไม่มี error
- Asset paths ใช้ relative path
