const { Server } = require('socket.io');
const chatManager = require('./managers/chatManager');

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Allow all for now, in production this should be restricted
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('join_room', (roomId) => {
      // Ensure roomId is treated as a string for the room name
      const roomIdentifier = String(roomId);
      socket.join(roomIdentifier);
      console.log(`Socket ${socket.id} joined room ${roomIdentifier}`);
    });

    socket.on('send_message', async (data) => {
      try {
        // Handle both camelCase and snake_case from mobile clients
        const roomId = data.roomId || data.room_id;
        const userId = data.userId || data.user_id;
        const content = data.content;

        if (!roomId || !userId || !content) {
          console.error('Missing required fields in send_message:', data);
          return;
        }
        
        // Save to DB
        const savedMessage = await chatManager.saveMessage(roomId, userId, content);
        
        // Broadcast to everyone in the room (including sender)
        const roomIdentifier = String(roomId);
        io.to(roomIdentifier).emit('receive_message', savedMessage);
        console.log(`Message broadcasted to room ${roomIdentifier}`);
      } catch (err) {
        console.error('Socket Message Error:', err);
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = initSocket;
