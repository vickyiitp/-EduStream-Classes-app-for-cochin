
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import uploadRoutes from './routes/upload';
import supportRoutes from './routes/support';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL || "*" }
});

app.use(helmet());
app.use(cors());
app.use(express.json());

// Real-time Engine
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Classroom Rooms
  socket.on('join-classroom', (batchId) => {
    socket.join(`class_${batchId}`);
  });

  // Live Support Logic
  socket.on('support-init', (userId) => {
    const supportRoom = `support_${userId}`;
    socket.join(supportRoom);
    console.log(`User ${userId} started support session in room ${supportRoom}`);
    // Notify admins of new support request
    io.to('admin_room').emit('new-support-request', { userId, socketId: socket.id });
  });

  socket.on('admin-join-support', (userId) => {
    socket.join(`support_${userId}`);
    socket.join('admin_room');
    console.log(`Admin joined support room for user ${userId}`);
  });

  socket.on('send-support-message', (data) => {
    // data: { roomId, senderId, text, role }
    io.to(data.roomId).emit('receive-support-message', {
      text: data.text,
      senderId: data.senderId,
      role: data.role,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Application Routes
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/support', supportRoutes);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`EduStream Full-Stack API running on port ${PORT}`);
});
