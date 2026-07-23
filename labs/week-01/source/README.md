# ENGSE203 LAB 01 — Developer Environment & GitHub Repository Setup

## ผู้จัดทำ

- ชื่อ-นามสกุล: Pich Sintornswat
- รหัสนักศึกษา: 67543210061-7
- ระบบปฏิบัติการที่ใช้: macOS

## วัตถุประสงค์ของงาน

- ตรวจสอบการติดตั้งและการใช้งาน Node.js, npm และ Git ผ่าน Terminal
- สร้างโครงงาน JavaScript เบื้องต้นด้วย Node.js
- เรียนรู้การสร้างและจัดการ npm script
- ฝึกใช้งาน Git และ GitHub สำหรับการจัดเก็บซอร์สโค้ด
- จัดทำ README เพื่อบันทึกขั้นตอนการทำงานและผลลัพธ์ที่ได้

## เครื่องมือที่ใช้

- Visual Studio Code
- Node.js (LTS)
- npm
- Git
- GitHub
- macOS

## วิธีติดตั้งและรัน

```bash
npm install
npm run start
```

หรือรันโดยตรงด้วย Node.js

```bash
node src/hello.js
```

## โครงสร้างไฟล์

```text
engse203-lab01/
├── src/
│   └── hello.js
├── package.json
└── README.md
```

## หลักฐานผลลัพธ์

ผลการตรวจสอบเวอร์ชันของเครื่องมือ

```bash
node -v
v22.x.x

npm -v
10.x.x

git --version
git version 2.x.x
```

ผลการรันโปรแกรม

```bash
npm run start

Hello Pich Sintornswat (67543210061-7) | OS: darwin | Node: v22.x.x
```

โปรแกรมสามารถแสดงชื่อ รหัสนักศึกษา ระบบปฏิบัติการ และเวอร์ชันของ Node.js ได้ถูกต้องตามข้อกำหนดของใบงาน

## ปัญหาที่พบและวิธีแก้ไข

- ปัญหา: ยังไม่คุ้นเคยกับการใช้งาน Git และ GitHub ผ่าน Terminal
- วิธีแก้: ศึกษาคู่มือการใช้งาน Git และทดลองใช้คำสั่ง git add, git commit และ git push หลายครั้งจนสามารถใช้งานได้

- ปัญหา: การตั้งค่า npm script ใน package.json
- วิธีแก้: ตรวจสอบรูปแบบ JSON และอ้างอิงจากเอกสาร Node.js/npm

## References & AI Assistance

- Source / Documentation:
  - Node.js Documentation
  - Git Documentation
  - GitHub Docs
  - Visual Studio Code Documentation

- AI tool used:
  - ChatGPT

- Used for:
  - ช่วยอธิบายขั้นตอนการใช้งาน Node.js, Git และการจัดรูปแบบ README

- My adaptation:
  - ศึกษาเนื้อหา ปรับแก้ และดำเนินการทุกขั้นตอนด้วยตนเองก่อนจัดทำรายงานฉบับสมบูรณ์