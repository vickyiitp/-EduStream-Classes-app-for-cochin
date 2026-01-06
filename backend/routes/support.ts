
import { Router } from 'express';
import { authenticateJWT } from '../middleware/auth';
import { isTeacher } from '../middleware/roleAuth';

const router = Router();

// Mock database for support tickets
let supportTickets = [
  { id: 'TKT-001', userId: 'usr_1', subject: 'Login Issue', status: 'Open', priority: 'High', createdAt: new Date() },
  { id: 'TKT-002', userId: 'usr_2', subject: 'Payment Failed', status: 'Resolved', priority: 'Urgent', createdAt: new Date() }
];

// User: Create a ticket
router.post('/tickets', authenticateJWT, (req, res) => {
  const { subject, description, category } = req.body;
  const newTicket = {
    id: `TKT-00${supportTickets.length + 1}`,
    userId: (req as any).user.userId,
    subject,
    status: 'Open',
    priority: 'Normal',
    createdAt: new Date()
  };
  supportTickets.push(newTicket);
  res.status(201).json(newTicket);
});

// Admin/Teacher: Get all active tickets
router.get('/tickets/active', authenticateJWT, isTeacher, (req, res) => {
  const active = supportTickets.filter(t => t.status === 'Open');
  res.json(active);
});

// Mock: Get chat history for a room
router.get('/history/:roomId', authenticateJWT, (req, res) => {
  res.json([
    { role: 'ai', text: 'Hello! How can I help you today?', timestamp: new Date() }
  ]);
});

export default router;
