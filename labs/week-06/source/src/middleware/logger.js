/**
 * W06-M1 (CP03) · middleware บันทึกทุกคำขอลง terminal
 * ตัวอย่าง:  GET /api/requests → 200 (2ms)
 */
export function logger(req, res, next) {
  const start = Date.now();
  res.on('finish', () => {
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
  });
  next();
}
