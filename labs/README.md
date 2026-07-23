# Weekly LAB Workspace

แต่ละ LAB ใช้โครงสร้างเดียวกัน:

```text
week-NN/
├── README.md
├── lab-metadata.json
├── source/      # source code ที่ตรวจ
├── evidence/    # screenshots/test/reflection
└── publish/     # build/static output ที่ต้องมี index.html
```

- แก้ source ใน `source/`
- ห้ามใส่ `.git`, `node_modules`, secret หรือ `.env`
- ใช้ `npm run import:source` และ `npm run import:publish` เพื่อลดความผิดพลาดจากการ copy
- ใช้ branch `lab/week-NN`, Pull Request เข้า `main` และ tag `lab-NN-submission-v1`
- `publish/` เป็น input ของ Pages ส่วน `docs/` เป็น generated output
- ถ้า build ใหม่และ `publish/` มีไฟล์เดิม ให้ตรวจ week ก่อน แล้วใช้ `npm run import:publish -- week-NN <build-output> --replace`

Template รุ่นนี้เตรียม LAB01–04 ไว้ให้แล้ว ส่วน LAB05 เป็นต้นไปให้อาจารย์เพิ่มด้วย `npm run add:lab -- week-NN` ก่อนประกาศ starter ประจำสัปดาห์
