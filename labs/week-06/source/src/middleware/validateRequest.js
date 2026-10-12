const REQUEST_TYPES = ['แจ้งซ่อม', 'บริการบัญชีผู้ใช้', 'ขอใช้อุปกรณ์', 'อื่น ๆ'];
const PRIORITIES = ['normal', 'urgent'];

/** ตัวช่วยอ่านข้อความอย่างปลอดภัย */
function readText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * W06-M2 (CP04) · ตรวจ body ก่อนถึง controller
 */
export function validateRequest(req, res, next) {
  const body = req.body ?? {};
  const details = [];

  const requesterName = readText(body.requesterName);
  const requestType = readText(body.requestType);
  const location = readText(body.location);
  const detailsText = readText(body.details);
  const priority = readText(body.priority);

  if (requesterName.length < 2) {
    details.push('requesterName ต้องยาวอย่างน้อย 2 ตัวอักษร');
  }
  if (!REQUEST_TYPES.includes(requestType)) {
    details.push(`requestType ต้องเป็นหนึ่งใน ${REQUEST_TYPES.join(', ')}`);
  }
  if (location.length === 0) {
    details.push('location ต้องไม่ว่าง');
  }
  if (detailsText.length < 10) {
    details.push('details ต้องยาวอย่างน้อย 10 ตัวอักษร');
  }
  if (!PRIORITIES.includes(priority)) {
    details.push(`priority ต้องเป็นหนึ่งใน ${PRIORITIES.join(', ')}`);
  }

  if (details.length > 0) {
    return res.status(400).json({
      error: 'ข้อมูลไม่ถูกต้อง',
      details,
    });
  }

  next();
}
