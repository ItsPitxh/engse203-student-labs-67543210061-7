# START HERE — รวม LAB 01–03 เข้า Student LAB Repository

เอกสารนี้เป็นไฟล์คำสั่งหลักสำหรับนักศึกษา ให้ทำตามลำดับโดยไม่ต้องเปิดหลายเอกสาร

## เป้าหมาย

เมื่อทำครบจะมี:

- Repository เดียวสำหรับ ENGSE203
- Branch `lab/week-01`, `lab/week-02`, `lab/week-03`
- Source เดิมอยู่ใน `labs/week-NN/source/`
- Evidence อยู่ใน `labs/week-NN/evidence/`
- Build/static output อยู่ใน `labs/week-NN/publish/`
- GitHub Pages Hub ที่เปิดผล LAB ทั้งสามจาก URL เดียว
- Pull Request และ submission tag ของแต่ละ LAB

> Repository เดิมของ LAB 01–03 ให้เก็บไว้เป็น read-only evidence ห้ามลบจนกว่าผู้สอนประกาศ

---

## 0. ตรวจเครื่องมือ

ใช้ Node.js `>=22.12.0`, npm และ Git จาก VS Code Terminal

```bash
node --version
npm --version
git --version
```

- macOS: ใช้ VS Code Integrated Terminal
- Windows 11: ใช้ VS Code Remote — WSL2 Ubuntu 24.04 และทำงานใน Linux filesystem เช่น `~/workspace/engse203`

---

## 1. สร้าง Repository จาก Template

บน GitHub กด **Use this template → Create a new repository** แล้วตั้งชื่อ:

```text
engse203-student-labs-<student-id>
```

ตัวอย่าง:

```text
engse203-student-labs-6501234567
```

Clone ผ่าน SSH:

```bash
git clone git@github.com:<github-username>/engse203-student-labs-<student-id>.git
cd engse203-student-labs-<student-id>
nvm use
npm install
```

ตั้งค่าข้อมูลนักศึกษา:

```bash
npm run setup -- \
  --student-id 6501234567 \
  --name "สมชาย ใจดี" \
  --section SEC1 \
  --github somchai-github \
  --mode migration
```

ตรวจไฟล์:

```bash
cat student-config.json
cat STUDENT_PROFILE.md
npm run build:pages
```

Commit baseline บน `main`:

```bash
git add .
git commit -m "chore: configure ENGSE203 student lab repository"
git push origin main
```

---

## 2. ความหมายของแต่ละโฟลเดอร์

```text
labs/week-NN/
├── README.md             # วิธีรัน/ทดสอบ LAB
├── lab-metadata.json     # URL, commit, PR, tag, status
├── source/               # source code ที่อาจารย์ตรวจ
├── evidence/             # screenshot/test/reflection
└── publish/              # web/build output ที่มี index.html

docs/                     # script สร้างใหม่ ห้ามแก้ด้วยมือ
└── labs/week-NN/         # GitHub Pages output
```

| งาน | นำไปวางที่ใด |
|---|---|
| HTML/CSS/JS/Node/Vite source | `labs/week-NN/source/` |
| Screenshots/Test output/Reflection | `labs/week-NN/evidence/` |
| Static site หรือ Vite build ที่มี `index.html` | `labs/week-NN/publish/` |
| Pages output | `docs/labs/week-NN/` สร้างด้วย script |

ห้ามคัดลอก `.git`, `node_modules`, `.env`, secret/token หรือ build เก่าปะปนใน `source/`

---

## 3. Migration LAB 01

สร้าง branch จาก `main`:

```bash
git switch main
git pull origin main
git switch -c lab/week-01
git branch --show-current
```

ผลต้องเป็น:

```text
lab/week-01
```

นำ source จาก repository เดิมเข้าด้วย script:

```bash
npm run import:source -- week-01 /absolute/path/to/engse203-lab01-old
```

ตัวอย่าง macOS:

```bash
npm run import:source -- week-01 ~/Documents/ENGSE203/engse203-lab01-6501234567
```

ตัวอย่าง WSL2:

```bash
npm run import:source -- week-01 ~/workspace/engse203/engse203-lab01-6501234567
```

ตรวจโปรแกรมเดิมตาม README เช่น:

```bash
npm --prefix labs/week-01/source install
npm --prefix labs/week-01/source test
```

หาก LAB เดิมไม่มี `test` script ให้รันคำสั่งจริง เช่น:

```bash
node labs/week-01/source/src/hello.js
```

นำ screenshot หรือ test output ที่ไม่เป็นข้อมูลลับเข้า:

```text
labs/week-01/evidence/
```

แก้ `labs/week-01/lab-metadata.json`:

```json
{
  "week": "week-01",
  "title": "Developer Environment & GitHub Repository Setup",
  "status": "ready",
  "sourceOrigin": "migrated-repository",
  "originalRepoUrl": "https://github.com/<username>/<old-lab01-repo>",
  "originalCommit": "abc1234",
  "pullRequestUrl": "",
  "submissionTag": "lab-01-submission-v1",
  "testStatus": "pass",
  "notes": "รัน hello.js และตรวจ environment แล้ว"
}
```

LAB 1 ไม่จำเป็นต้องมี web application ระบบจะสร้าง evidence report ให้อัตโนมัติ

```bash
npm run build:pages
npm run verify:lab -- week-01
git add .
git commit -m "feat(week-01): migrate developer environment lab"
git push -u origin lab/week-01
```

เปิด Pull Request `lab/week-01 → main` แล้วนำ PR URL กลับมาใส่ `pullRequestUrl` เปลี่ยน `status` เป็น `submitted` จากนั้น commit/push อีกครั้ง:

```bash
npm run build:pages
npm run verify:lab -- week-01
git add .
git commit -m "docs(week-01): add submission metadata"
git push
```

Merge PR แล้วสร้าง tag:

```bash
git switch main
git pull origin main
git tag lab-01-submission-v1
git push origin lab-01-submission-v1
```

---

## 4. Migration LAB 02

```bash
git switch main
git pull origin main
git switch -c lab/week-02
npm run import:source -- week-02 /absolute/path/to/engse203-lab02-old
```

LAB 2 เป็น Vite project ให้แก้ `vite.config.js` ใน source ก่อน build:

```js
export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
```

ติดตั้ง ตรวจ และ build:

```bash
npm --prefix labs/week-02/source install
npm --prefix labs/week-02/source run check
npm --prefix labs/week-02/source run build
```

นำ build output เข้า publish:

```bash
npm run import:publish -- week-02 labs/week-02/source/dist
```

ถ้าโครงงานเดิม build ไป folder อื่น ให้เปลี่ยน path ท้ายคำสั่งให้ตรง output ที่มี `index.html`

```bash
npm run import:publish -- week-02 /path/to/actual-build-output
```

แก้ `labs/week-02/lab-metadata.json` ให้มี original URL/commit, planned tag และ `testStatus: "pass"` แล้ว:

```bash
npm run build:pages
npm run verify:lab -- week-02
git add .
git commit -m "feat(week-02): migrate modern JavaScript lab"
git push -u origin lab/week-02
```

เปิด PR, ใส่ PR URL ใน metadata, เปลี่ยน status เป็น `submitted`, build/verify/push แล้ว merge และสร้าง tag:

```bash
git switch main
git pull origin main
git tag lab-02-submission-v1
git push origin lab-02-submission-v1
```

---

## 5. Migration LAB 03

```bash
git switch main
git pull origin main
git switch -c lab/week-03
npm run import:source -- week-03 /absolute/path/to/engse203-lab03-old
```

ถ้า LAB 3 เป็น static HTML และ `index.html` อยู่ที่ source root:

```bash
npm run import:publish -- week-03 labs/week-03/source
```

ถ้ามี build command ให้รันทดสอบ/build ก่อน แล้ว import จาก output folder:

```bash
npm --prefix labs/week-03/source install
npm --prefix labs/week-03/source run check
npm --prefix labs/week-03/source run build
npm run import:publish -- week-03 labs/week-03/source/dist
```

Manual test ขั้นต่ำ:

1. Desktop layout
2. Mobile 375px ไม่มี horizontal scroll
3. Form invalid ไม่ submit
4. Form valid แสดงผลตามโจทย์
5. Event interaction ทำงาน
6. Console ไม่มี error

แก้ metadata แล้ว:

```bash
npm run build:pages
npm run verify:lab -- week-03
git add .
git commit -m "feat(week-03): migrate responsive UI lab"
git push -u origin lab/week-03
```

เปิด PR, ใส่ PR URL/status, build/verify/push, merge และสร้าง tag `lab-03-submission-v1`

---

## 6. ตั้งค่า GitHub Pages

เมื่อ merge LAB ทั้งสามเข้า `main` แล้ว:

```text
GitHub Repository
→ Settings
→ Pages
→ Build and deployment
→ Deploy from a branch
→ Branch: main
→ Folder: /docs
→ Save
```

Pages Hub:

```text
https://<github-username>.github.io/engse203-student-labs-<student-id>/
```

LAB URLs:

```text
.../labs/week-01/
.../labs/week-02/
.../labs/week-03/
```

เปิดทุก URL ใน Incognito และตรวจ Console/Network ว่าไม่มี error หรือ 404

---

## 7. Final Verification

```bash
git switch main
git pull origin main
npm run build:pages
npm run verify
git status
```

Definition of Done:

- [ ] `student-config.json` ไม่มี placeholder
- [ ] Branch `lab/week-01`–`lab/week-03` มีบน GitHub
- [ ] Source LAB ทั้งสามอยู่ถูกโฟลเดอร์
- [ ] ไม่มี `.git`, `node_modules`, `.env` หรือ secret ใน LAB folders
- [ ] metadata มี original repository/commit, PR, tag และ test status
- [ ] PR ทั้งสาม merge แล้ว
- [ ] Tag `lab-01-submission-v1`–`lab-03-submission-v1` มีจริง
- [ ] Pages Hub และ LAB URLs เปิดได้
- [ ] LAB 2/3 interaction และ asset paths ทำงาน

---

## 8. ข้อมูลที่กรอกใน Google Sheet

กรอกเพียงข้อมูลระบุตัวตนและ URL/เวอร์ชันที่ผู้สอนใช้ตรวจ:

| คอลัมน์ | ตัวอย่าง |
|---|---|
| Section | SEC1 |
| Student ID | 6501234567 |
| Student Name | สมชาย ใจดี |
| GitHub Username | somchai-github |
| Repository URL | `https://github.com/.../engse203-student-labs-6501234567` |
| Pages Hub URL | `https://...github.io/engse203-student-labs-6501234567/` |
| LAB 01 Result URL | `https://...github.io/.../labs/week-01/` |
| LAB 01 PR URL | `https://github.com/.../pull/1` |
| LAB 01 Tag | `lab-01-submission-v1` |
| LAB 02 Result URL | `https://...github.io/.../labs/week-02/` |
| LAB 02 PR URL | `https://github.com/.../pull/2` |
| LAB 02 Tag | `lab-02-submission-v1` |
| LAB 03 Result URL | `https://...github.io/.../labs/week-03/` |
| LAB 03 PR URL | `https://github.com/.../pull/3` |
| LAB 03 Tag | `lab-03-submission-v1` |
| Student Self-check | Complete |

อาจารย์เปิด Pages Hub เป็นจุดเริ่มตรวจ แล้วใช้ปุ่ม Source/PR และ tag เพื่อยืนยัน code/version

---

## 9. เพิ่ม LAB 04 และสัปดาห์ต่อไป

```bash
git switch main
git pull origin main
npm run add:lab -- week-04 "React Campus Service Request"
git add .
git commit -m "chore(week-04): add LAB workspace"
git switch -c lab/week-04
```

จากนั้นใช้ contract เดิม:

```text
source → labs/week-04/source/
evidence → labs/week-04/evidence/
build output → labs/week-04/publish/
Pages → docs/labs/week-04/
```

สำหรับ React/Vite ให้กำหนด base:

```text
/engse203-student-labs-<student-id>/labs/week-04/
```

แล้วใช้ `npm run build:pages`, `npm run verify:lab -- week-04`, PR, merge และ submission tag เช่นเดียวกัน

---

## Troubleshooting

| อาการ | ตรวจ/แก้ |
|---|---|
| import source ไม่ได้ | ใช้ absolute path และตรวจว่า target ยังมีเพียง placeholder |
| import publish ไม่ได้ | output folder ต้องมี `index.html` ที่ root |
| LAB 2 Pages ไม่มี CSS/JS | ตรวจ Vite `base` ให้ตรง repository + `/labs/week-02/` |
| Pages 404 | ตรวจ `main /docs`, `docs/index.html` และ merge ล่าสุด |
| verify บอก status draft | แก้ `lab-metadata.json` เป็น `ready` หรือ `submitted` |
| verify บอก originalCommit | ใช้ `git rev-parse HEAD` ใน repository เดิม |
| มีไฟล์ใหญ่/จำนวนมาก | ตรวจว่าไม่ได้ copy `node_modules`, `.git`, `dist` หรือ build เก่า |
| ต้องแก้งานหลังตรวจ | ใช้ branch `fix/week-NN-v2`, PR ใหม่ และ tag `lab-NN-submission-v2` |
