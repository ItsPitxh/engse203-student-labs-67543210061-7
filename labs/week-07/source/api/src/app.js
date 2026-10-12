import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { config } from './config.js';
import requestRoutes from './routes/requestRoutes.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  /**
   * W07-A1 (CP10) · เปิด CORS ก่อน middleware อื่น
   * ⚠ ต้องอยู่บนสุด เพราะเบราว์เซอร์ส่ง preflight (OPTIONS) มาก่อน
   */
  app.use(cors({ origin: config.corsOrigin }));

  /**
   * W07-A2 (CP14) · logger แบบ production ด้วย morgan
   *   dev → 'dev'       (อ่านง่าย มีสี)
   *   prod → 'combined' (ละเอียด เหมาะเก็บ log)
   */
  app.use(morgan(config.isProduction ? 'combined' : 'dev'));

  app.use(express.json());

  app.get('/', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '2.0.0' });
  });
  app.use('/api/requests', requestRoutes);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
