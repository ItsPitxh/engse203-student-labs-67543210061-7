# Week 04 — React Campus Service Request

## เริ่มงาน

```bash
git switch main
git pull origin main
git switch -c lab/week-04
```

คัดลอก LAB 4 starter จาก Course Repository มาไว้ใน `source/` แล้วรัน:

```bash
npm --prefix labs/week-04/source install
npm --prefix labs/week-04/source run check
npm --prefix labs/week-04/source run build
npm run import:publish -- week-04 labs/week-04/source/dist
```

ใส่ผล TC-01–TC-12 และภาพ desktop/mobile ใน `evidence/` จากนั้นแก้ metadata, รัน `npm run build:pages` และ `npm run verify:lab -- week-04`

Submission tag: `lab-04-submission-v1`
