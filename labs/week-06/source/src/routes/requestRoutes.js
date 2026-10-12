import { Router } from 'express';
import * as controller from '../controllers/requestController.js';
import { validateRequest } from '../middleware/validateRequest.js';

const router = Router();

/**
 * W06-R1 · route ของ resource "requests"
 * - path คงที่ต้องมาก่อน path ที่มี :id
 * - validateRequest คั่นก่อน createRequest ตอน POST
 */
router.get('/', controller.listRequests);
router.post('/', validateRequest, controller.createRequest);

router.get('/:id', controller.getRequest);
router.put('/:id', controller.updateRequestStatus);
router.delete('/:id', controller.deleteRequest);

export default router;
