const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', socket => {
  console.log('A user connected');

  socket.on('set username', username => {
    socket.username = username;
  });

  socket.on('chat message', msg => {
    io.emit('chat message', {
      username: socket.username || 'Anonymous',
      message: msg
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
