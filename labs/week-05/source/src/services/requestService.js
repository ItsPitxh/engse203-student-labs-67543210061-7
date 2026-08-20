/**
 * requestService.js — ชั้นเข้าถึงข้อมูล
 *
 * กติกาที่ checker ตรวจจริง:
 *   - fetch() ต้องอยู่ในไฟล์นี้เท่านั้น
 *   - หน้าและ component เรียกเฉพาะฟังก์ชันที่ export จากไฟล์นี้
 *
 * TODO ในไฟล์นี้แบ่งเป็น 2 ระยะ
 *   5A-x  ทำในคาบแรก  (อ่านข้อมูล)
 *   5B-x  ทำในคาบสอง  (เขียนข้อมูล)
 * ทำเฉพาะ TODO ของคาบปัจจุบัน อย่าข้ามไปทำของคาบหน้า
 */

// TODO 5B-1: เปิดใช้บรรทัดล่างนี้เมื่อถึงคาบ 5B
import {
  clearStoredRequests,
  readStoredRequests,
  writeStoredRequests,
} from "./requestStorage.js";



const LAB_DELAY_MS = 420;

/* ─────────── ให้มาแล้ว ไม่ต้องแก้ ─────────── */

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * หน่วงเวลาเล็กน้อยเพื่อให้เห็น loading state ชัดเจน
 * ตัวแปร __ENGSE203_SKIP_DELAY__ เป็นสวิตช์ให้ checker ปิดการหน่วงตอนทดสอบ
 * ไม่ใช่ส่วนหนึ่งของงานที่ต้องทำ
 */
async function waitForLabDelay() {
  await delay(globalThis.__ENGSE203_SKIP_DELAY__ ? 0 : LAB_DELAY_MS);
}

/* ─────────── คาบ 5A ─────────── */

/**
 * TODO 5A-1 · อ่านข้อมูลตัวอย่างจากไฟล์ public/data/initialRequests.json
 *
 * สิ่งที่ต้องทำ
 *   1. หา base URL จาก import.meta.env?.BASE_URL โดยมี ?. ด้วย
 *      (ถ้าไม่ใส่ ?. checker จะเรียกฟังก์ชันนี้นอก Vite ไม่ได้)
 *   2. fetch ไปที่ `${baseUrl}data/initialRequests.json`
 *   3. ตรวจ response.ok ก่อนเสมอ ถ้าไม่ ok ให้ throw ข้อความที่ผู้ใช้เข้าใจได้
 *   4. แปลงเป็น JSON แล้วคืนสำเนาด้วย structuredClone()
 *
 * ทำไมต้อง structuredClone: เพื่อให้ผู้เรียกได้ข้อมูลชุดของตัวเอง
 * ถ้าคืนตัวเดิมไปตรง ๆ แล้วมีคนแก้ ข้อมูลต้นทางจะเปลี่ยนตามโดยไม่ตั้งใจ
 */
async function fetchSeedRequests() {
  // throw new Error("TODO 5A-1: fetchSeedRequests");
  const baseUrl = import.meta.env?.BASE_URL ?? "/";
  const response = await fetch(`${baseUrl}data/initialRequests.json`);
  if (!response.ok) throw new Error("ไม่สามารถโหลดข้อมูลตัวอย่างได้");
  return structuredClone(await response.json());
}

/**
 * TODO 5A-2 · ทำให้ getRequests() คืนข้อมูลได้
 *
 * ตอนนี้ให้คืนผลจาก fetchSeedRequests() ตรง ๆ
 * (คาบหน้าเราจะเปลี่ยนบรรทัดนี้เพียงบรรทัดเดียว)
 *
 * ส่วน scenario error และ empty เขียนไว้ให้แล้ว ใช้ทดสอบ UI
 */
export async function getRequests(options = {}) {
  await waitForLabDelay();

  if (options.scenario === "error") {
    throw new Error("LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ");
  }
  if (options.scenario === "empty") {
    return [];
  }
  return loadNormalRequests(options.onRecovery);

  // TODO 5A-2: return fetchSeedRequests();
  // return fetchSeedRequests();
  // TODO 5B-3: เปลี่ยนบรรทัดข้างบนเป็น return loadNormalRequests(options.onRecovery);
  // throw new Error("TODO 5A-2: getRequests normal flow");
}

function readText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function validateRequestInput(input) {
  if (!input) throw new Error("ข้อมูลคำร้องไม่ถูกต้อง");
  if (readText(input.requesterName).length < 2)
    throw new Error("ชื่อผู้แจ้งไม่ถูกต้อง");
  if (!readText(input.requestType)) throw new Error("กรุณาเลือกประเภทคำร้อง");
  if (!["normal", "urgent"].includes(input.priority))
    throw new Error("ความเร่งด่วนไม่ถูกต้อง");
  if (!readText(input.location)) throw new Error("กรุณาเลือกสถานที่");
  if (readText(input.details).length < 10)
    throw new Error("รายละเอียดต้องมีอย่างน้อย 10 ตัวอักษร");
}
/**
 * TODO 5A-3 · หาคำร้องใบเดียวตามรหัส
 *
 * เรียก getRequests() แล้วค้นหาด้วย .find()
 * ถ้าไม่พบ ให้คืน null — ห้าม throw
 * เพราะ "หาไม่เจอ" ไม่ใช่ความผิดพลาดของระบบ
 */
export async function getRequestById(requestId) {
  const requests = await getRequests();
  return requests.find((request) => request.id === requestId) ?? null;
  // throw new Error("TODO 5A-3: getRequestById");
}

/* ─────────── คาบ 5B ─────────── */

/**
 * TODO 5B-2 · อ่านจากที่เก็บก่อน ถ้าไม่มีค่อยอ่านไฟล์
 *
 * ลำดับที่ต้องทำ
 *   1. เรียก readStoredRequests()
 *   2. ถ้า status เป็น 'valid' คืนข้อมูลนั้นได้เลย
 *   3. ถ้าไม่ ให้ fetchSeedRequests() แล้ว writeStoredRequests() เก็บไว้ 
 *   4. ถ้า status เป็น 'invalid' ให้เรียก onRecovery?.(ข้อความ) เพื่อให้หน้าจอแจ้งผู้ใช้
 *   5. คืนข้อมูล seed
 */
async function loadNormalRequests(onRecovery) {
  const stored = readStoredRequests();
  // return fetchSeedRequests();
  if (stored.status === "valid") return stored.requests;
  const seedRequests = await fetchSeedRequests();
  writeStoredRequests(seedRequests);
  return seedRequests;
  //throw new Error('TODO 5B-2: loadNormalRequests');
}

/**
 * TODO 5B-4 · เพิ่มคำร้องใหม่
 *
 *   1. ตรวจข้อมูลก่อนใช้งาน — ระวังกรณี field เป็น undefined
 *      อย่าใช้ input.name?.trim().length < 2 เพราะ undefined < 2 ได้ false เงียบ ๆ
 *   2. สร้างรหัสที่ขึ้นต้นด้วย REQ- และไม่ซ้ำกับที่มีอยู่
 *   3. ตัดช่องว่างหัวท้ายทุก field ที่เป็นข้อความ
 *   4. status เริ่มต้นเป็น 'pending' เสมอ
 *   5. persist แล้วคืน object ใหม่
 */
function createRequestId(requests) {
  let id;
  do{
    const time = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).slice(2,6).toUpperCase();
    id = `REQ-${time}-${random}`;
  } while (requests.some((request) => request.id === id));
  return id;
}

export async function addRequest(requestInput) {
  // void requestInput;
  // throw new Error("TODO 5B-4: addRequest");
  validateRequestInput(requestInput);
  const requests = await getRequests();
  const newRequest = {
    id: createRequestId(requests),
    requesterName: requestInput.requesterName.trim(),
    requestType: requestInput.requestType,
    location: requestInput.location.trim(),
    details: requestInput.details.trim(),
    priority: requestInput.priority,
    status: "pending",
  };
  writeStoredRequests([...requests, newRequest]);
  return structuredClone(newRequest);
}

/**
 * TODO 5B-5 · ลบคำร้องตามรหัส
 * ใช้ .filter() สร้าง array ใหม่ อย่าแก้ array เดิม แล้ว persist
 */
export async function deleteRequest(requestId) {
  const requests = await getRequests();
  const nextRequests = requests.filter((request) => request.id !== requestId);
  writeStoredRequests(nextRequests);
  return structuredClone(nextRequests);
}

/**
 * TODO 5B-6 · คืนค่าข้อมูลตัวอย่างเริ่มต้น
 * ล้างคีย์ของ LAB05 แล้วโหลด seed ใหม่ทับ
 */
export async function resetRequests() {
  // throw new Error("TODO 5B-6: resetRequests");
  clearStoredRequests();
  const seedRequest = await fetchSeedRequests();
  writeStoredRequests(seedRequest);
  return structuredClone(seedRequest);
}
