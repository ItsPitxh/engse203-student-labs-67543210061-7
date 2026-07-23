# Week 02 — Modern JavaScript Learning Dashboard

## รุ่นใหม่

เปิด `lab/week-02` แล้วคัดลอก LAB02 starter จาก Course Repository เข้า `source/`

```bash
npm --prefix labs/week-02/source install
npm --prefix labs/week-02/source run check
npm --prefix labs/week-02/source run build
npm run import:publish -- week-02 labs/week-02/source/dist
```

Starter ใช้ Vite `base: './'` เพื่อให้ทำงานใต้ Pages Hub subpath

## รุ่นปัจจุบันที่มี repo เดิม

```bash
npm run import:source -- week-02 /path/to/old-lab02
```

build โครงงานเดิมแล้ว import output ที่มี `index.html` เข้า publish พร้อมตั้ง `sourceOrigin: "migrated-repository"`

## Evidence

- Normal/error state
- `npm run check` และ build
- PR และ Pages result
