/**
 * ตัวกลางสำหรับคุยกับ API — ที่เดียวที่เรียก fetch()
 */

/**
 * W07-F1 (CP11) · อ่าน base URL จาก environment
 * ⚠ ตัวแปรของ Vite ต้องขึ้นต้นด้วย VITE_ เท่านั้น
 */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001';

/** error ที่รู้ว่ามาจาก API พร้อม status ที่ได้กลับมา */
export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function parseError(response) {
  try {
    const body = await response.json();
    return body.error ?? `คำขอไม่สำเร็จ (${response.status})`;
  } catch {
    return `คำขอไม่สำเร็จ (${response.status})`;
  }
}

/**
 * W07-F2 (CP11) · ยิง fetch แล้วจัดการ response ทั้ง 4 กรณี
 *   1. network error → ApiError(status 0)
 *   2. 4xx/5xx       → ApiError(message จาก body, response.status)
 *   3. 204           → null
 *   4. 2xx อื่น      → response.json()
 */
export async function apiFetch(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers ?? {}),
    },
  };

  let response;
  try {
    response = await fetch(url, config);
  } catch (networkError) {
    throw new ApiError(
      'ต่อเซิร์ฟเวอร์ไม่ได้ กรุณาตรวจว่าเปิด API ไว้แล้วหรือยัง',
      0,
    );
  }

  if (!response.ok) {
    const message = await parseError(response);
    throw new ApiError(message, response.status);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
