import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const PLACEHOLDER_FILES = new Set(["PLACE_SOURCE_HERE.md", "PLACE_BUILD_OUTPUT_HERE.md", ".gitkeep"]);

export function normalizeWeek(value) {
  const raw = String(value ?? "").trim().toLowerCase();
  const match = raw.match(/^(?:week-?)?(\d{1,2})$/);
  if (!match) throw new Error(`Week ไม่ถูกต้อง: "${value}" — ใช้รูปแบบ week-01`);
  const number = Number(match[1]);
  if (number < 1 || number > 18) throw new Error("Week ต้องอยู่ระหว่าง 01–18");
  return `week-${String(number).padStart(2, "0")}`;
}

export async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

export async function writeJson(filePath, value) {
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, "utf8");
}

export async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function validHttpUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    return "";
  }
}

export async function listLabs() {
  const labsRoot = path.join(ROOT, "labs");
  const entries = await fs.readdir(labsRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory() && /^week-\d{2}$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
}

export async function meaningfulEntries(directory) {
  if (!(await exists(directory))) return [];
  const entries = await fs.readdir(directory);
  return entries.filter((entry) => !PLACEHOLDER_FILES.has(entry));
}

export function isInsideRoot(target) {
  const relative = path.relative(ROOT, path.resolve(target));
  return relative && !relative.startsWith("..") && !path.isAbsolute(relative);
}

export const sourceExcludes = new Set([
  ".git", "node_modules", "dist", "docs", ".DS_Store", "Thumbs.db",
  ".env", ".env.local", ".env.production", ".env.development",
]);

export const publishExcludes = new Set([
  ".git", "node_modules", ".DS_Store", "Thumbs.db", ".env",
]);

export function copyFilter(excludes) {
  return (source) => !source.split(path.sep).some((part) => excludes.has(part));
}
