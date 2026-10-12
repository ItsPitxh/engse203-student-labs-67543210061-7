import { config } from '../config.js';

/**
 * ⭐ Challenge · AppError — error ที่กำหนด status เองได้
 * โยนจาก service/controller → errorHandler จะแปลเป็น HTTP response ให้
 *
 *   throw new AppError(404, 'ไม่พบคำร้อง')
 */
export class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.name = 'AppError';
    this.status = status;
    this.isOperational = true;
  }
}

/**
 * ⭐ Challenge · asyncHandler — ห่อ handler ที่เป็น async
 * ให้ Error ที่โยนจาก async ไหลไปถึง errorHandler ได้โดยไม่ต้อง try/catch
 *
 *   router.get('/', asyncHandler(async (req, res) => { ... }))
 */
export function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

/**
 * errorHandler · 4 พารามิเตอร์ Express ถึงจะรู้ว่าเป็น error handler
 * - AppError → ใช้ status ที่กำหนด
 * - อื่น ๆ   → 500
 * - production ไม่ส่ง stack trace ออกไป (กันข้อมูลภายในหลุด)
 */
export function errorHandler(err, req, res, next) {
  const status = err instanceof AppError ? err.status : 500;
  const message = err instanceof AppError
    ? err.message
    : (config.isProduction ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์' : err.message);

  console.error(`[${status}] ${req.method} ${req.originalUrl} —`, err.message);

  const payload = { error: message };
  // ส่ง stack ไปด้วยเฉพาะใน development เพื่อช่วย debug
  if (!config.isProduction && status === 500) {
    payload.stack = err.stack?.split('\n').slice(0, 5);
  }
  res.status(status).json(payload);
}

/** ไม่มี route ไหนตรง */
export function notFound(req, res) {
  res.status(404).json({ error: `ไม่พบเส้นทาง ${req.method} ${req.originalUrl}` });
}
