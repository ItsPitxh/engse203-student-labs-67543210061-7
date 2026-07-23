import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, copyFilter, exists, meaningfulEntries, normalizeWeek, publishExcludes } from "./common.mjs";

const args = process.argv.slice(2);
const replace = args.includes("--replace");
const positional = args.filter((arg) => arg !== "--replace");
const week = normalizeWeek(positional[0]);
const source = path.resolve(positional[1] ?? "");
const target = path.join(ROOT, "labs", week, "publish");

if (!(await exists(source))) throw new Error(`ไม่พบ build/static output: ${source}`);
if (!(await exists(path.join(source, "index.html")))) throw new Error("publish source ต้องมี index.html ที่ root");
if (!(await exists(path.join(ROOT, "labs", week)))) throw new Error(`ไม่พบ ${week}; ใช้ npm run add:lab ก่อน`);

const current = await meaningfulEntries(target);
if (current.length > 0 && !replace) {
  throw new Error(
    `publish/${week} มีไฟล์อยู่แล้ว: ${current.join(", ")} — ตรวจ week/path แล้วรันซ้ำพร้อม --replace`,
  );
}

await fs.rm(target, { recursive: true, force: true });
await fs.mkdir(target, { recursive: true });
await fs.cp(source, target, { recursive: true, filter: copyFilter(publishExcludes) });

console.log(`Import publish output: PASS — ${week}`);
if (replace) console.log("Mode: replace เฉพาะ publish ของ week ที่ระบุ");
console.log(`Next: npm run build:pages`);
