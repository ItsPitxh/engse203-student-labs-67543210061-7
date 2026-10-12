import { config } from './config.js';
import { createApp } from './app.js';
import { loadSeed } from './services/requestService.js';

await loadSeed();
const app = createApp();

/**
 * W07-SRV (CP10) · ใช้ค่าจาก config แทนตัวเลขฝังในโค้ด
 */
app.listen(config.port, () => {
  console.log(`Campus Service API พร้อมที่ http://localhost:${config.port}`);
  console.log(`อนุญาตให้เรียกจาก origin: ${config.corsOrigin}`);
});
