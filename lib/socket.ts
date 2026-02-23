import { io } from 'socket.io-client';

// In production, replace with your Render/Railway URL
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001';

export const socket = io(SOCKET_URL, {
  autoConnect: false, // We connect only when needed
});