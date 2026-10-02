import http from 'http';
import dotenv from 'dotenv';
import { Server as SocketIOServer } from 'socket.io';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.io
export const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`🔌 Socket Client Connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`🔌 Socket Client Disconnected: ${socket.id}`);
  });
});

// Start Server
const startServer = async () => {
  await connectDB();

  server.listen(PORT, () => {
    console.log(`🚀 ShopPulse Server running on http://localhost:${PORT}`);
    console.log(`📡 Socket.IO initialized`);
  });
};

startServer().catch((err) => {
  console.error('Fatal Server Error:', err);
  process.exit(1);
});
