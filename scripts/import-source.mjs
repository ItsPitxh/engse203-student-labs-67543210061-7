import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, copyFilter, exists, isInsideRoot, meaningfulEntries, normalizeWeek, sourceExcludes } from "./common.mjs";

const week = normalizeWeek(process.argv[2]);
const source = path.resolve(process.argv[3] ?? "");
const target = path.join(ROOT, "labs", week, "source");

if (!(await exists(source))) throw new Error(`ไม่พบ source path: ${source}`);
if (!(await exists(path.join(ROOT, "labs", week)))) throw new Error(`ไม่พบ ${week}; ใช้ npm run add:lab ก่อน`);
if (isInsideRoot(source)) throw new Error("source import ต้องมาจากโฟลเดอร์ภายนอก template เพื่อป้องกันการ copy วนซ้ำ");

const current = await meaningfulEntries(target);
if (current.length > 0) throw new Error(`source/${week} มีไฟล์อยู่แล้ว: ${current.join(", ")} — script จะไม่เขียนทับ`);

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await fs.cp(source, target, { recursive: true, filter: copyFilter(sourceExcludes) });

const imported = await meaningfulEntries(target);
if (imported.length === 0) throw new Error("ไม่พบ source file ที่นำเข้าได้");

console.log(`Import source: PASS — ${week}`);
console.log(`Excluded: ${[...sourceExcludes].join(", ")}`);
console.log(`Next: ตรวจ source แล้วรันทดสอบของ LAB เดิม`);
