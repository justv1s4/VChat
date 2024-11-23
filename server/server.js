const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

// Default route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');  // Serve the HTML file
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('chat message', (msg) => {
    // Broadcast the message to all clients
    io.emit('chat message', msg);
  });

  // Handle user disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
