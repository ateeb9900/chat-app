const express = require('express'); // Import Express
const http = require('http'); // Import HTTP module to create the server
const socketIo = require('socket.io'); // Import Socket.IO

const app = express(); // Create an Express application
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.IO to the server

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for chat messages
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg); // Broadcast the message to all connected clients
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
