
import { Router } from 'express';
import * as authController from '../controllers/authController';
import batchRoutes from './batchRoutes';
import userRoutes from './userRoutes';
import { authenticateJWT } from '../middleware/auth';

const router = Router();

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Batch Management
router.use('/batches', batchRoutes);

// User Management
router.use('/users', userRoutes);

// Protected Sample Route
router.get('/user/me', authenticateJWT, (req: any, res) => {
  res.json(req.user);
});

export default router;
