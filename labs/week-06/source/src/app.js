import express from 'express';
import requestRoutes from './routes/requestRoutes.js';
import { logger } from './middleware/logger.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // W06-A1 (CP03) · middleware ต้องมาก่อน route
  app.use(logger);
  app.use(express.json());

  // W06-A2 (CP01) · root route ทดสอบว่าเซิร์ฟเวอร์ทำงาน
  app.get('/', (req, res) => {
    res.json({ message: 'Campus Service API is running', version: '1.0.0' });
  });

  // W06-A3 (CP02) · ติด resource routes
  app.use('/api/requests', requestRoutes);

  // W06-A4 (CP07) · notFound → errorHandler (ท้ายสุด)
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
