# Weekly LAB Workflow — ใช้กับ LAB01 และทุกสัปดาห์ถัดไป

แทน `NN` ด้วยหมายเลขสัปดาห์ เช่น `01` หรือ `04`

## 1. เปิด Branch

```bash
git switch main
git pull origin main
git switch -c lab/week-NN
```

## 2. ทำงานใน Folder ประจำสัปดาห์

```text
labs/week-NN/source/    source code
labs/week-NN/evidence/ screenshot/test/reflection
labs/week-NN/publish/  build/static output ที่มี index.html
```

ตัวอย่าง Vite:

```bash
npm --prefix labs/week-NN/source install
npm --prefix labs/week-NN/source run check
npm --prefix labs/week-NN/source run build
npm run import:publish -- week-NN labs/week-NN/source/dist
```

เมื่อ build ซ้ำและต้องแทน publish เดิม ให้ตรวจว่า week และ path ถูกต้องก่อน แล้วใช้:

```bash
npm run import:publish -- week-NN labs/week-NN/source/dist --replace
```

## 3. Build และ Verify

แก้ `lab-metadata.json` แล้วรัน:

```bash
npm run build:pages
npm run verify:lab -- week-NN
git add .
git commit -m "feat(week-NN): complete LAB work"
git push -u origin lab/week-NN
```

## 4. PR และ Submission Version

เปิด PR `lab/week-NN → main`, ใส่ PR URL ใน metadata, เปลี่ยน status เป็น `submitted`, build/verify/push แล้ว merge

```bash
git switch main
git pull origin main
git tag lab-NN-submission-v1
git push origin lab-NN-submission-v1
```

## 5. ส่งให้อาจารย์

- Pages Hub URL
- Weekly Result URL ที่ `.../labs/week-NN/`
- Pull Request URL ของ `lab/week-NN → main` ที่ merge แล้ว
- Tag `lab-NN-submission-v1`

Repository URL ส่งครั้งแรกหรือเมื่อผู้สอนร้องขอ โดยไม่สร้าง repository ใหม่ในแต่ละสัปดาห์
