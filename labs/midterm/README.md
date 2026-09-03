# ENGSE203 สอบกลางภาค — ภาคปฏิบัติ (Part B) · Sec 2 / ชุด B

แอป **Campus Service Request** เดียวกับที่ทำใน LAB
ทำงานทีละ **checkpoint** และ **commit ทุกครั้งที่ผ่าน checkpoint**

---

## 1. เริ่มต้น (ทำครั้งเดียว ~3 นาที)

ทำงานใน **repo ของตัวเอง** บน branch ชื่อ `midterm`

```bash
cd engse203-student-labs-<รหัสของคุณ>     # repo ของคุณเอง
git checkout main
git pull
git checkout -b midterm                   # สร้าง branch สอบ
```

จากนั้นนำโฟลเดอร์ข้อสอบมาวางเป็น `midterm/` ใน repo (อาจารย์แจก zip หรือดาวน์โหลดจากลิงก์ที่ให้)

```bash
cd midterm
npm ci
npm run dev        # เปิด http://localhost:5173
```

> ถ้า `npm ci` ไม่ผ่าน ลอง `npm install` · ถ้ายังไม่ได้ **ยกมือเรียกอาจารย์ทันที**

---

## 2. งาน (รวม 40 คะแนน · 180 นาที)

| งาน | คะแนน | สรุป |
|---|---:|---|
| B1 Debug | 12 | หา/แก้บั๊ก 6 จุด + กรอก `B1_BUGS.md` |
| B2 Search | 10 | เพิ่มช่องค้นหาใน Dashboard |
| B3 Persist | 10 | ปุ่ม "ทำเสร็จ" เปลี่ยนสถานะแล้วรอด refresh |
| B4 Component | 8 | สร้าง `PriorityBadge` แล้วใช้ใน `RequestCard` |

รายละเอียดเต็มอยู่ใน **`PartB_Exam_TH.pdf`** · วิธีทำ/ส่งงานอยู่ใน **`PartB_StudentGuide_TH.pdf`**

---

## 3. วิธีทำงาน

```
อ่านโจทย์ → ทำนายผล → แก้ทีละจุด → npm run dev แล้วสังเกต → ตรงตัวอย่าง output → commit
```

```bash
git add -A
git commit -m "B2.2: filter by name/details"
```

**commit ทุก checkpoint** — ประวัติ commit คือหลักฐานว่าทำเอง

---

## 4. กติกา

- ใช้ AI/เอกสาร/เว็บได้ — แต่ต้อง commit ทุก checkpoint และกรอก `AI_USAGE.md`
- ทุกคนถูกสัมภาษณ์ (oral) จากโค้ดที่ส่ง — อธิบายไม่ได้ คะแนนถูกทบทวน
- **ห้ามแก้ไฟล์ในโฟลเดอร์ `services/`** (เขียนว่า "ให้มาแล้ว — ห้ามแก้")
- ห้ามคุยกับเพื่อน / ส่งไฟล์หากัน

---

## 5. การส่งงาน (ไม่ต้องทำ Pull Request)

```bash
cd midterm
npm run build                  # 1) ต้องขึ้น "✓ built" ไม่มี error

# 2) กรอก SUBMISSION.md ให้ครบ (ชื่อ รหัส ผล build เช็คลิสต์)

cd ..
git add -A
git commit -m "final: all tasks + build passes"
git tag midterm-submission-v1  # 3) ติด tag
git push -u origin midterm --tags
```

**เสร็จแล้วแจ้งอาจารย์ว่าพร้อม oral** พร้อมบอก URL repo ของคุณ

> ไม่ต้อง merge เข้า main · ไม่ต้องเปิด Pull Request · งานอยู่บน branch `midterm`
