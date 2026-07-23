# START HERE — สร้าง Student Repository ก่อนทำ LAB01

ทำเอกสารนี้เพียงครั้งเดียวก่อนเริ่มรายวิชา หลังจากนั้นใช้ repository เดิมตลอด ENGSE203

## ภาพรวม

```text
main
├── lab/week-01 → PR → merge → tag lab-01-submission-v1
├── lab/week-02 → PR → merge → tag lab-02-submission-v1
├── lab/week-03 → PR → merge → tag lab-03-submission-v1
└── lab/week-04 → PR → merge → tag lab-04-submission-v1
```

Pages Hub ใช้ URL เดิมตลอดรายวิชา ส่วนผลรายสัปดาห์อยู่ที่ `/labs/week-NN/`

## 1. สร้าง Repository จาก Template

บน GitHub กด **Use this template → Create a new repository** แล้วตั้งชื่อ:

```text
engse203-student-labs-<student-id>
```

ไม่ต้องเลือก Include all branches จากนั้น clone ผ่าน SSH:

```bash
git clone git@github.com:<github-username>/engse203-student-labs-<student-id>.git
cd engse203-student-labs-<student-id>
nvm use
npm install
```

## 2. ตั้งค่าข้อมูล

```bash
npm run setup -- \
  --student-id <student-id> \
  --name "ชื่อ นามสกุล" \
  --section SEC1 \
  --github <github-username> \
  --mode new-course
```

ตรวจไฟล์และสร้าง Pages Hub:

```bash
cat student-config.json
cat STUDENT_PROFILE.md
npm run build:pages
npm run verify:setup
```

คำสั่ง `verify:setup` ต้องไม่มี `FAIL` และต้องไม่มี placeholder ในข้อมูลนักศึกษา

## 3. Commit Baseline

```bash
git add .
git commit -m "chore: configure ENGSE203 student repository"
git push origin main
```

## 4. เปิด GitHub Pages

```text
Settings → Pages → Deploy from a branch → main → /docs
```

Pages Hub จะเป็น URL เดิมตลอดรายวิชา:

```text
https://<github-username>.github.io/engse203-student-labs-<student-id>/
```

## 5. เริ่ม LAB01

```bash
git switch main
git pull origin main
git switch -c lab/week-01
```

จากนั้นอ่านโจทย์ LAB01 ใน Course Repository และคัดลอก starter ไปที่ `labs/week-01/source/`

โครงสร้างมาตรฐานของทุก LAB คือ:

```text
labs/week-NN/
├── README.md
├── lab-metadata.json
├── source/
├── evidence/
└── publish/

docs/labs/week-NN/  # สร้างอัตโนมัติ ห้ามแก้ด้วยมือ
```

## ตรวจความพร้อม

- [ ] Repository name ถูกต้อง
- [ ] `student-config.json` ไม่มี placeholder
- [ ] `npm run verify:setup` ผ่าน
- [ ] baseline อยู่บน `main`
- [ ] Pages ใช้ `main /docs`
- [ ] เห็นการ์ด LAB01–04
- [ ] เปิด Pages Hub ใน Incognito ได้
- [ ] ไม่มี password, token หรือ `.env`
