
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import apiRoutes from './routes';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL || '*' }
});

app.use(helmet());
app.use(cors());
app.use(express.json());

// Socket.io Logic for Live Classes
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });

  socket.on('send-message', (data) => {
    io.to(data.roomId).emit('receive-message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Main API running on port ${PORT}`);
});
