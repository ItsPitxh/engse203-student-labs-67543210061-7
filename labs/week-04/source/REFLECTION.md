# Pre-LAB 04 Reflection — CP07

ชื่อ–นามสกุล: Pich Sintornswat  
รหัสนักศึกษา: 67543210061-7  

1. Component ใดเป็น state owner ของ tasks และ statusFilter เพราะเหตุใด?

   คำตอบ: `App` component เป็น state owner ของทั้ง `tasks` และ `statusFilter` เนื่องจากข้อมูลทั้งสองส่วนถูกใช้งานร่วมกันข้ามหลาย child components (เช่น `SummaryPanel`, `TaskForm`, `FilterBar` และ `TaskList`) การเก็บ state ไว้ที่ `App` ซึ่งเป็น Top-level Component ร่วม (Lifting State Up) ช่วยให้ส่งผ่านข้อมูลแบบ One-way Data Flow ได้อย่างถูกต้อง

2. ระบุตัวอย่าง Props ลงอย่างน้อย 2 จุด และ callback event ขึ้นอย่างน้อย 1 จุด

   คำตอบ:
   - **Props ไหลลง**: 
     1. `App` ส่ง `summary` object ลงไปให้ `SummaryPanel` ผ่าน `summary={summary}`
     2. `App` ส่ง `filteredTasks` array ลงไปให้ `TaskList` ผ่าน `tasks={filteredTasks}`
   - **Callback Event ไหลขึ้น**: 
     1. `TaskCard` เรียก `onDeleteTask(task.id)` สื่อสารกลับไปยัง `TaskList` และขึ้นไปถึง `App` เพื่อเรียก `setTasks()` อัปเดต state แบบ immutable

3. เมื่อนำ pattern ไปใช้ LAB 4 ต้องเปลี่ยน data contract, validation และ component responsibility อย่างไร?

   คำตอบ:
   - **Data Contract**: เปลี่ยนโครงสร้าง object จาก `title`, `category`, `priority`, `status` เป็น field ของ Campus Service Request เช่น `requesterName`, `requestType`, `location`, `details`, `priority`, `status`
   - **Validation**: ปรับเปลี่ยนกฎให้สอดคล้องกับแบบฟอร์มใหม่ เช่น ตรวจสอบ `requesterName` (อย่างน้อย 2 ตัวอักษร), `location` (ไม่ว่าง), และ `details` (อย่างน้อย 10 ตัวอักษร)
   - **Component Responsibility**: เปลี่ยนชื่อและหน้าที่จาก `TaskForm`/`TaskList`/`TaskCard` เป็น `RequestForm`/`RequestList`/`RequestCard` เพื่อรองรับการแสดงผลรายละเอียดคำร้องบริการภายในมหาวิทยาลัย