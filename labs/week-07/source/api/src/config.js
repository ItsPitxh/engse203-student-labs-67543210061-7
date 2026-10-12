import 'dotenv/config';

/**
 * W07-CFG (CP10) · ค่าตั้งค่าศูนย์กลาง
 * - อ่านจาก process.env (ซึ่ง dotenv โหลดมาจาก .env แล้ว)
 * - ทุกค่ามีค่าเริ่มต้นเผื่อไม่มี .env
 * - process.env.* เป็น string เสมอ ต้องแปลง port เป็น Number เอง
 */
export const config = {
  port: Number(process.env.PORT ?? 3001),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  get isProduction() {
    return this.nodeEnv === 'production';
  },
};
