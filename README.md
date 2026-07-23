# ENGSE203 Student LAB Portfolio

Repository เดียวสำหรับเก็บผลงาน LAB ตลอดรายวิชา โดยใช้ branch รายสัปดาห์และ GitHub Pages Hub สำหรับตรวจผลลัพธ์

## เลือกเส้นทางเริ่มต้น

- **รุ่นถัดไป/ยังไม่เริ่ม LAB01:** อ่าน [START_HERE_BEFORE_LAB01.md](./START_HERE_BEFORE_LAB01.md)
- **รุ่นปัจจุบันมี repo LAB01–03 แยกแล้ว:** อ่าน [START_HERE_LAB01_TO_LAB03.md](./START_HERE_LAB01_TO_LAB03.md)
- **ทุกสัปดาห์:** ใช้ [WEEKLY_LAB_WORKFLOW.md](./WEEKLY_LAB_WORKFLOW.md)

```bash
nvm use
npm install
npm run setup -- --student-id 6500000000 --name "ชื่อ นามสกุล" --section SEC1 --github github-user --mode new-course
```

## Repository Contract

| รายการ | รูปแบบ |
|---|---|
| Repository | `engse203-student-labs-<student-id>` |
| Weekly branch | `lab/week-NN` |
| Source | `labs/week-NN/source/` |
| Evidence | `labs/week-NN/evidence/` |
| Publish input | `labs/week-NN/publish/` |
| Pages output | `docs/labs/week-NN/` |
| Pages source | `main /docs` |
| Submission | Pages Hub URL + Weekly Result URL + merged PR URL + submission tag |

## คำสั่งหลัก

```bash
npm run import:source -- week-01 /path/to/old-lab01-repository
npm run import:publish -- week-03 labs/week-03/source
npm run build:pages
npm run verify
```

ถ้า build ซ้ำ ใช้ `--replace` ต่อท้ายคำสั่ง `import:publish` หลังตรวจ week และ path แล้ว

ห้ามแก้ไฟล์ใน `docs/` ด้วยมือ เพราะ `npm run build:pages` จะสร้างใหม่จาก config, metadata และโฟลเดอร์ `publish/`

## Pages URL

```text
https://<github-username>.github.io/engse203-student-labs-<student-id>/
```

## LAB ที่เตรียมไว้

Template รุ่นนี้มี workspace LAB01–04 และ Pages Hub จะสร้างการ์ดจากทุก `labs/week-NN/` อัตโนมัติ

## เพิ่ม LAB ในอนาคต

```bash
npm run add:lab -- week-05 "React Routing and Data"
```

จากนั้นใช้ workflow เดิมกับ `lab/week-05` และ `labs/week-05/`
