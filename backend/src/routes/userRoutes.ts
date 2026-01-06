
import { Router } from 'express';
import * as userController from '../controllers/userController';
import { authenticateJWT } from '../middleware/auth';
import { isTeacher } from '../middleware/roleAuth'; // Admin check usually goes through this or specific isAdmin

const router = Router();

// Only Admins (or elevated teachers) should manage users
router.get('/', authenticateJWT, isTeacher, userController.getAllUsers);
router.post('/', authenticateJWT, isTeacher, userController.createUser);
router.put('/:id', authenticateJWT, isTeacher, userController.updateUser);
router.delete('/:id', authenticateJWT, isTeacher, userController.deleteUser);

export default router;
