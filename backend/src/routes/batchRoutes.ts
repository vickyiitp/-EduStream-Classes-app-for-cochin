
import { Router } from 'express';
import * as batchController from '../controllers/batchController';
import { authenticateJWT } from '../middleware/auth';
import { isTeacher } from '../middleware/roleAuth';

const router = Router();

router.get('/', batchController.getAllBatches);
router.post('/', authenticateJWT, isTeacher, batchController.createBatch);
router.put('/:id', authenticateJWT, isTeacher, batchController.updateBatch);
router.delete('/:id', authenticateJWT, isTeacher, batchController.deleteBatch);

export default router;
