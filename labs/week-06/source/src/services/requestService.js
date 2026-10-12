import { readFile, writeFile } from 'node:fs/promises';

const SEED_PATH = new URL('../../data/initialRequests.json', import.meta.url);

/** ข้อมูลอยู่ในหน่วยความจำของเซิร์ฟเวอร์ — หน่วย 4 จะเปลี่ยนเป็นฐานข้อมูล */
let requests = [];

/** โหลดข้อมูลตัวอย่างตอนเซิร์ฟเวอร์เริ่มทำงาน — ให้มาแล้ว ไม่ต้องแก้ */
export async function loadSeed() {
  const raw = await readFile(SEED_PATH, 'utf8');
  requests = JSON.parse(raw);
  return requests;
}

/**
 * CP08 · บันทึกสถานะปัจจุบันลงไฟล์ JSON
 * - เขียนแบบ "fire-and-forget" ไม่ให้ความช้าของดิสก์ไปทำให้ response ช้า
 * - ถ้าเขียนพลาด log ไว้ใน terminal เพื่อไม่ให้ครึ่ง ๆ กลาง ๆ โดยเงียบ
 */
function persist() {
  const snapshot = JSON.stringify(requests, null, 2);
  writeFile(SEED_PATH, snapshot, 'utf8').catch((err) => {
    console.error('persist() ล้มเหลว:', err.message);
  });
}

/**
 * W06-S1 · คืนรายการคำร้องทั้งหมด
 * W06-S1b (⭐) · ถ้ามี options.status ให้กรองเฉพาะสถานะนั้น
 */
export function findAll({ status } = {}) {
  const source = status ? requests.filter((r) => r.status === status) : requests;
  return structuredClone(source);
}

/**
 * W06-S2 · คืนคำร้องใบเดียวตามรหัส — ไม่พบคืน null
 */
export function findById(id) {
  const found = requests.find((r) => r.id === id);
  return found ? structuredClone(found) : null;
}

/** สร้างรหัสไม่ซ้ำ — ให้มาแล้ว ไม่ต้องแก้ */
function createId() {
  let id;
  do {
    const time = Date.now().toString(36).toUpperCase();
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
    id = `REQ-${time}-${rand}`;
  } while (requests.some((r) => r.id === id));
  return id;
}

/** ตัวช่วย: ตัดช่องว่างหัวท้ายถ้าค่าเป็นสตริง */
function trim(value) {
  return typeof value === 'string' ? value.trim() : value;
}

/**
 * W06-S3 · เพิ่มคำร้องใหม่
 */
export function create(input) {
  const now = new Date().toISOString();
  const next = {
    id: createId(),
    requesterName: trim(input.requesterName),
    requestType: trim(input.requestType),
    location: trim(input.location),
    details: trim(input.details),
    priority: trim(input.priority),
    status: 'pending',
    createdAt: now,
  };
  requests.push(next);
  persist();
  return structuredClone(next);
}

/**
 * W06-S4 (⭐) · เปลี่ยนสถานะคำร้อง
 */
export function updateStatus(id, status) {
  const found = requests.find((r) => r.id === id);
  if (!found) return null;
  found.status = status;
  found.updatedAt = new Date().toISOString();
  persist();
  return structuredClone(found);
}

/**
 * W06-S5 · ลบคำร้องตามรหัส
 */
export function remove(id) {
  const before = requests.length;
  requests = requests.filter((r) => r.id !== id);
  const changed = requests.length !== before;
  if (changed) persist();
  return changed;
}
