# AI Usage Log — สอบกลางภาค ENGSE203 (ภาคปฏิบัติ)

**ชื่อ–นามสกุล:** ______________________ **รหัส:** ______________ **Sec:** 2 **ชุด:** B

---

## วิธีกรอก (อ่านก่อนเริ่ม)

บันทึก **ทุกครั้ง** ที่ถาม AI (ChatGPT, Claude, Copilot, Gemini ฯลฯ) ระหว่างสอบ — **1 แถว = 1 ครั้งที่ถาม**

- ไม่ต้องวางบทสนทนาทั้งหมด — **สรุปสั้น ๆ** พอให้กลับมาอธิบายใน oral ได้
- ถ้า **ไม่ได้ใช้ AI** ในงานไหน ให้เขียนบรรทัด `ไม่ได้ใช้ AI` ของงานนั้น (บอกตรง ๆ ดีกว่าเว้นว่าง)
- ช่องสำคัญที่สุดคือช่องสุดท้าย **"ฉันทำอะไรต่อ"** — เป็นหลักฐานว่าคุณเข้าใจ ไม่ได้ก๊อปมาเฉย ๆ

### ความหมายแต่ละคอลัมน์

| คอลัมน์ | ใส่อะไร |
|---|---|
| **เวลา** | เวลาโดยประมาณ เช่น `10:15` |
| **งาน** | `B1` / `B2` / `B3` / `B4` |
| **Prompt ที่ถาม** | คำถาม/คำสั่งที่คุณพิมพ์ให้ AI (คำของคุณเอง) |
| **AI ตอบว่าอะไร** | สรุปคำตอบหรือโค้ดที่ AI ให้มา สั้น ๆ |
| **ฉันทำอะไรต่อ** | ใช้เลย / แก้ตรงไหน / ทิ้งเพราะอะไร **+ ตรวจว่าถูกอย่างไร** |

---

## ตัวอย่าง (ดูระดับรายละเอียดที่ต้องการ — ลบทิ้งได้ หรือปล่อยไว้ก็ได้)

| เวลา | งาน | Prompt ที่ถาม | AI ตอบว่าอะไร | ฉันทำอะไรต่อ |
|---|---|---|---|---|
| 10:05 | B2 | "React กรอง array ด้วยหลายเงื่อนไขพร้อมกันยังไง" | แนะนำให้ใช้ `.filter()` ต่อกันสองชั้น | ใช้แนวนี้ แต่แก้ให้ค้นทั้ง `requesterName` และ `details` + ใส่ `toLowerCase()` · ทดสอบพิมพ์ "ห้อง" ได้ REQ-002, REQ-003 ตรงโจทย์ |
| 10:38 | B3 | "กดปุ่มแล้ว badge เปลี่ยน แต่แผงสรุปไม่อัปเดต เพราะอะไร" | บอกว่าต้อง `setState` ด้วยข้อมูลชุดใหม่ ไม่ใช่แก้ของเดิม | เข้าใจว่าต้อง `setRequests(nextRequests)` ที่ได้กลับจาก `updateRequestStatus` · ลองรีเฟรช (F5) แล้วค่ายังอยู่ = persist จริง |
| 10:52 | B4 | "เขียน component ให้แสดงป้ายตามค่าที่ส่งมา" | ให้โครง if-return 2 กรณี | เพิ่มกรณีที่ 3 (ค่าอื่น → "ไม่ระบุ") เองเพราะข้อมูลอาจมีค่าที่ไม่คาดคิด · ทดสอบด้วย `priority="high"` ได้ "ไม่ระบุ" |
| 10:15 | B1 | `ไม่ได้ใช้ AI` (แก้เองจากการอ่าน Warning ใน Console) | — | — |

---

## บันทึกของฉัน (กรอกตรงนี้)

| เวลา | งาน | Prompt ที่ถาม | AI ตอบว่าอะไร | ฉันทำอะไรต่อ |
|---|---|---|---|---|
| ~13:20 | B1.1 (Hook / Lifecycle) | "useEffect what does it do and what is the dependencies of it does" | อธิบายหน้าที่ของ `useEffect` และพฤติกรรมของ dependency array: `[]` ทำงานรอบเดียว, `[deps]` ทำงานเมื่อค่าเปลี่ยน, ไม่ใส่จะรันทุก render | ตรวจสอบ `DashboardPage.jsx` และ `RequestDetailPage.jsx` ว่า dependency array ขาดตัวแปรสำคัญอะไรไปบ้าง |
| ~13:35 | B1.2 (Route Param Bug) | "what is useParam()" | อธิบายการดึงค่า dynamic segment จาก URL (React Router) และชี้ให้เห็นว่าถ้าดึง `requestId` มาใช้ ต้องใส่ลงใน dependency array ของ `useEffect` เพื่อให้โหลดข้อมูลใหม่เมื่อ URL เปลี่ยน[cite: 1, 2] | ไปแก้ `RequestDetailPage.jsx` โดยเพิ่ม `[requestId, reloadKey]` ใน `useEffect` เพื่อแก้ Bug 4 ที่เปลี่ยน URL แล้วหน้าไม่รีเฟรช[cite: 1, 2] |
| ~13:45 | B1.3 (Async/Delete Bug) | "async function handleDelete... is there something wrong with this?" | ชี้จุดผิด 2 เรื่อง: ขาดคำสั่ง `await` หน้า `deleteRequest()` ทำให้ได้ `Promise` แทน array ส่งผลให้หน้าจอพัง (Bug 6) และแจ้งเรื่องตัวเลข summary ไม่ลด (Bug 5)[cite: 2] | ใส่ `await deleteRequest(requestId)` ใน `handleDelete` และทดสอบกดปุ่มลบว่าหน้าไม่พังและตัวเลขแผงสรุปลดลงจริง[cite: 2] |
| ~14:05 | B1.4 (Summary Calculation) | "compare these two, i want to know why the request status is messed up in the summary panel" | ชี้จุดผิดใน `DashboardPage.jsx` ตรง `useMemo`: บรรทัด `completed:` ดันไปเช็คเงื่อนไข `request.status === "in-progress"` ซ้ำกับตัวบน ทำให้ช่องเสร็จสิ้นแสดงค่าผิด (Bug 2)[cite: 2] | แก้ไขเงื่อนไขของ `completed` ให้เป็น `request.status === "completed"` เพื่อให้แสดงตัวเลข 5/2/1/2 ตรงตามข้อสอบ[cite: 2] |
| ~14:25 | B2.1 & B2.2 (Search UI) | "add requests.filter onKeyUp" | แนะนำไม่ให้ใช้ `onKeyUp` เพราะตกหล่น event การแปะ/ลบ และแนะให้ใช้ `useState` ผูกกับ `onChange` ร่วมกับ derived state ใน `.filter()` เพื่อความ reactive[cite: 2] | สร้าง state `searchTerm` และเพิ่ม `<input>` เหนือรายการ พร้อมเขียนเงื่อนไขกรอง `requestType` และ `location` แบบ `toLowerCase()`[cite: 2] |
| ~14:40 | B2.3 (Combine Filter) | "why use && when returning the value" | อธิบายว่า `&&` บังคับให้ตรงทั้ง 2 เงื่อนไข (สถานะต้องตรง AND คำค้นหาต้องตรง) ถ้าใช้ `||` ผลลัพธ์จะปนกันและไม่ซ้อนทับตามโจทย์ CP-B2.3[cite: 2] | เขียนเงื่อนไข `return matchesStatus && matchesSearch;` ใน `filteredRequests` และทดสอบกรอง "เสร็จสิ้น" + พิมพ์ "ซ่อม"[cite: 2] |
| ~14:55 | B2.4 (Oral Pitfall Warning) | "add search by status but if status matches change the summary state to that status" | เตือนว่าห้ามเปลี่ยนค่า `summary` ตามคำค้นหาเด็ดขาด เพราะโจทย์ CP-B2.4 บังคับให้แผงสรุปคำนวณจาก `requests` ทั้งหมดเสมอ[cite: 2] | คงโครงสร้าง `useMemo` ของ `summary` ให้อ่านจาก `requests` ตัวเต็ม ไม่เปลี่ยนตาม `filteredRequests` เพื่อป้องกันการโดนตัดคะแนน[cite: 2] |
| ~15:10 | B2.3 Debug (Infinite Loop) | "const filteredRequests = requests.filter... query === request.status ?? setStatusFilter(query)" | เตือนว่าการเรียก `setStatusFilter()` ข้างใน `.filter()` เป็น side effect ระหว่าง render ทำให้เกิด infinite loop (`Too many re-renders`) และตัวแอปจะ crash ทันที | ลบคำสั่ง `setStatusFilter` ออกจากฟังก์ชัน `.filter()` แล้วคงไว้เพียง pure logic สำหรับคืนค่า boolean เท่านั้น |
| ~15:25 | B3.1 (Acknowledge Button) | "Add 'รับเรื่อง' button solely on cards where status === 'pending'" | แนะนำวิธีส่ง props callback `onAcknowledge` จาก `DashboardPage` ผ่าน `RequestList` ไปยัง `RequestCard` และใส่เงื่อนไข `{request.status === 'pending' && (...)}`[cite: 2] | เพิ่มปุ่ม "รับเรื่อง" ใน `RequestCard.jsx` เฉพาะกรณี `pending` และผูก event handler สำหรับส่ง `requestId` ขึ้นไป[cite: 2] |
| ~15:40 | B3.3 (Verify Persistence) | "how do i verify persistance" | แนะนำ 3 ขั้นตอนตรวจสอบ: 1) กดรีเฟรชเบราว์เซอร์ดู UI, 2) เช็ค DevTools -> Application -> Local Storage หาคีย์ `engse203-campus-requests-v1`, 3) เช็คผ่านคอนโซล[cite: 1, 2] | ทำการกดปุ่มรับเรื่องบน REQ-102 แล้วกดรีเฟรชหน้าจอ (F5) เพื่อยืนยันว่าสถานะยังคงเป็น `in-progress` และตรวจสอบค่าใน Local Storage จริง[cite: 2] |

*(เพิ่มแถวได้ตามต้องการ — คัดลอกบรรทัด `| | | | | |` ไปวางเพิ่ม)*

---

## คำรับรอง

ฉันเข้าใจโค้ดทุกส่วนที่ส่ง และพร้อมอธิบายใน oral

**ลงชื่อ:** พิชฌ์​ สินธรสวัสดิ์
