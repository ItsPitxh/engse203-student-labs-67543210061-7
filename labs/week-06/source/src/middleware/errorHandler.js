/**
 * W06-M3 (CP07) · จับ error ที่หลุดจากทุก route
 * ต้องมี 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler
 */
export function errorHandler(err, req, res, next) {
  console.error('[errorHandler]', err.message);
  res.status(500).json({
    error: 'เซิร์ฟเวอร์ขัดข้อง กรุณาลองใหม่อีกครั้ง',
  });
}

/**
 * W06-M4 (CP07) · ไม่มี route ไหนตรง → 404
 */
export function notFound(req, res) {
  res.status(404).json({
    error: `ไม่พบ path ${req.method} ${req.originalUrl}`,
  });
}
