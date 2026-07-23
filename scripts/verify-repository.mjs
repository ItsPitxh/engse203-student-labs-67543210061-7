import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { ROOT, exists, listLabs, meaningfulEntries, normalizeWeek, readJson, validHttpUrl } from "./common.mjs";

const args = process.argv.slice(2);
const setupMode = args.includes("--setup");
const weekFlag = args.indexOf("--week");
const selectedWeek = weekFlag >= 0 ? normalizeWeek(args[weekFlag + 1]) : "";
const errors = [];
const warnings = [];
const pass = [];

const config = await readJson(path.join(ROOT, "student-config.json"));
if (/STUDENT-ID|GITHUB-USERNAME|ชื่อ-นามสกุล/.test(JSON.stringify(config))) errors.push("ยังไม่ได้รัน npm run setup หรือ student-config ยังมี placeholder");
else pass.push("student-config");
if (!["new-course", "migration"].includes(config.repositoryMode)) errors.push("student-config.repositoryMode ต้องเป็น new-course หรือ migration");

const nodeVersion = process.versions.node.split(".").map(Number);
if (nodeVersion[0] < 22 || (nodeVersion[0] === 22 && nodeVersion[1] < 12)) errors.push(`Node ${process.versions.node} ต่ำกว่า 22.12.0`);
else pass.push(`Node ${process.versions.node}`);

let labs = await listLabs();
if (selectedWeek) labs = labs.filter((week) => week === selectedWeek);
if (labs.length === 0) errors.push(`ไม่พบ LAB ${selectedWeek || "ใน repository"}`);

for (const week of labs) {
  const labRoot = path.join(ROOT, "labs", week);
  const metadataPath = path.join(labRoot, "lab-metadata.json");
  if (!(await exists(metadataPath))) { errors.push(`${week}: ไม่มี lab-metadata.json`); continue; }
  const metadata = await readJson(metadataPath);
  if (metadata.week !== week) errors.push(`${week}: metadata.week ไม่ตรง folder`);
  if (!["course-starter", "migrated-repository", "student-created"].includes(metadata.sourceOrigin)) errors.push(`${week}: sourceOrigin ไม่ถูกต้อง`);
  if (!(await exists(path.join(ROOT, "docs", "labs", week, "index.html")))) errors.push(`${week}: ยังไม่มี Pages output — รัน npm run build:pages`);
  if (!setupMode) {
    if (!["ready", "submitted", "revision"].includes(metadata.status)) errors.push(`${week}: status ยังเป็น draft/ไม่ถูกต้อง`);
    if (metadata.testStatus !== "pass") errors.push(`${week}: testStatus ต้องเป็น pass`);
    if ((await meaningfulEntries(path.join(labRoot, "source"))).length === 0) errors.push(`${week}: ยังไม่มี source code`);
    if (config.repositoryMode === "migration" && ["week-01", "week-02", "week-03"].includes(week) && metadata.sourceOrigin !== "migrated-repository") {
      errors.push(`${week}: migration mode ต้องตั้ง sourceOrigin เป็น migrated-repository`);
    }
    if (metadata.sourceOrigin === "migrated-repository") {
      if (!validHttpUrl(metadata.originalRepoUrl)) errors.push(`${week}: originalRepoUrl ไม่ถูกต้อง`);
      if (!/^[a-f0-9]{7,40}$/i.test(metadata.originalCommit)) errors.push(`${week}: originalCommit ต้องเป็น Git commit SHA 7–40 ตัว`);
    }
    if (metadata.status === "submitted") {
      if (!validHttpUrl(metadata.pullRequestUrl)) errors.push(`${week}: submitted ต้องมี pullRequestUrl`);
      if (!/^lab-\d{2}-submission-v\d+$/i.test(metadata.submissionTag)) errors.push(`${week}: submissionTag ใช้รูปแบบ lab-01-submission-v1`);
    }
  }
  pass.push(`${week} ${setupMode ? "setup structure/metadata/pages" : "structure/metadata/pages"}`);
}

const forbiddenNames = new Set([".git", "node_modules", ".env", ".env.local", ".env.production"]);
async function scanForbidden(directory) {
  if (!(await exists(directory))) return;
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    if (forbiddenNames.has(entry.name)) errors.push(`พบไฟล์/โฟลเดอร์ที่ห้าม commit: ${path.relative(ROOT, path.join(directory, entry.name))}`);
    else if (entry.isDirectory()) await scanForbidden(path.join(directory, entry.name));
  }
}
await scanForbidden(path.join(ROOT, "labs"));

try {
  const branch = execFileSync("git", ["branch", "--show-current"], { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  if (selectedWeek && branch && branch !== `lab/${selectedWeek}` && branch !== "main") warnings.push(`current branch = ${branch}; ที่แนะนำคือ lab/${selectedWeek}`);
} catch {
  warnings.push("ยังตรวจ Git branch ไม่ได้จนกว่าจะ git init/clone");
}

console.log(`Verification summary: ${pass.length} pass, ${warnings.length} warning, ${errors.length} error`);
pass.forEach((item) => console.log(`PASS  ${item}`));
warnings.forEach((item) => console.log(`WARN  ${item}`));
errors.forEach((item) => console.log(`FAIL  ${item}`));
if (errors.length > 0) process.exitCode = 1;
