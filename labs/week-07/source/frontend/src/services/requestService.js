import { apiFetch, ApiError } from './apiClient.js';

/**
 * Week 07 — Service Layer เรียก API จริงแทน localStorage
 *
 * ⚠ signature ของทุกฟังก์ชันคงเดิม — DashboardPage/RequestDetailPage/NewRequestPage
 *   ไม่ต้องแก้แม้แต่บรรทัดเดียว นี่คือคุณค่าของ Service Layer
 */

export { ApiError };

/**
 * W07-F3 (CP11) · GET /api/requests
 * - รองรับ scenario 'error' / 'empty' เพื่อทดสอบสถานะหน้าจอ
 * - รองรับ options.status เพื่อกรอง (?status=pending)
 */
export async function getRequests(options = {}) {
  const { scenario, status, onRecovery } = options;

  if (scenario === 'error') {
    throw new ApiError('จำลองข้อผิดพลาด: โหลดคำร้องไม่สำเร็จ', 0);
  }
  if (scenario === 'empty') {
    return [];
  }

  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  try {
    return await apiFetch(`/api/requests${query}`);
  } catch (error) {
    if (typeof onRecovery === 'function' && error instanceof ApiError && error.status === 0) {
      onRecovery('ขณะนี้ต่อ API ไม่ได้ ลองใหม่อีกครั้งเมื่อเซิร์ฟเวอร์พร้อม');
    }
    throw error;
  }
}

/**
 * W07-F4 (CP11) · GET /api/requests/:id
 * - 404 → คืน null (ไม่โยน error — "ไม่พบ" ไม่ใช่ความผิดพลาดระบบ)
 */
export async function getRequestById(requestId) {
  try {
    return await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/**
 * W07-F5 (CP11) · POST /api/requests
 */
export async function addRequest(requestInput) {
  return apiFetch('/api/requests', {
    method: 'POST',
    body: JSON.stringify(requestInput),
  });
}

/**
 * W07-F6 (CP13) · PUT /api/requests/:id เปลี่ยนสถานะ
 */
export async function updateRequestStatus(requestId, status) {
  return apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

/**
 * W07-F7 (CP11) · DELETE /api/requests/:id
 * - คืน "รายการล่าสุดจากเซิร์ฟเวอร์" (ไม่เดาเองว่าเหลืออะไร)
 */
export async function deleteRequest(requestId) {
  await apiFetch(`/api/requests/${encodeURIComponent(requestId)}`, { method: 'DELETE' });
  return getRequests();
}

/** Week 07 ยังไม่มี endpoint reset — โหลดรายการปัจจุบันกลับมาแทน */
export async function resetRequests() {
  return getRequests();
}
