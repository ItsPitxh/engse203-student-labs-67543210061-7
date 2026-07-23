import fs from "node:fs/promises";
import path from "node:path";
import { ROOT, exists, normalizeWeek, writeJson } from "./common.mjs";

const week = normalizeWeek(process.argv[2]);
const title = process.argv.slice(3).join(" ").trim();
if (title.length < 3) throw new Error('ระบุชื่อ LAB เช่น npm run add:lab -- week-04 "React Campus Service Request"');

const labRoot = path.join(ROOT, "labs", week);
if (await exists(labRoot)) throw new Error(`${week} มีอยู่แล้ว — script จะไม่เขียนทับ`);

await fs.mkdir(path.join(labRoot, "source"), { recursive: true });
await fs.mkdir(path.join(labRoot, "publish"), { recursive: true });
await fs.mkdir(path.join(labRoot, "evidence"), { recursive: true });

await writeJson(path.join(labRoot, "lab-metadata.json"), {
  week,
  title,
  status: "draft",
  sourceOrigin: "course-starter",
  originalRepoUrl: "",
  originalCommit: "",
  pullRequestUrl: "",
  submissionTag: "",
  testStatus: "not-tested",
  notes: "",
});

await fs.writeFile(path.join(labRoot, "README.md"), `# ${week} — ${title}\n\nอธิบายโจทย์ วิธีรัน วิธีทดสอบ และหลักฐานของสัปดาห์นี้\n`, "utf8");
await fs.writeFile(path.join(labRoot, "source", "PLACE_SOURCE_HERE.md"), `# วาง Source ${week} ที่นี่\n`, "utf8");
await fs.writeFile(path.join(labRoot, "publish", "PLACE_BUILD_OUTPUT_HERE.md"), "# วาง Build Output ที่มี index.html ที่นี่\n", "utf8");
await fs.writeFile(path.join(labRoot, "evidence", "README.md"), `# ${week} Evidence\n`, "utf8");

console.log(`Add LAB: PASS — ${week} ${title}`);
console.log(`Create branch: git switch -c lab/${week}`);
