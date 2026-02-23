const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow connections from any mobile/desktop browser
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    
    // Strict 2-peer limit for security
    if (room && room.size >= 2) {
      socket.emit('room-full');
      return;
    }

    socket.join(roomId);
    socket.emit('joined-room', roomId);
    
    // Notify others in room that a peer has joined
    socket.to(roomId).emit('user-connected', socket.id);
  });

  // Relay WebRTC Signals (Offer, Answer, ICE Candidates)
  socket.on('signal', (data) => {
    socket.to(data.room).emit('signal', {
      signal: data.signal,
      sender: socket.id
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`🚀 Signaling server running on port ${PORT}`));