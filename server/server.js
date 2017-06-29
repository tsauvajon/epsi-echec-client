const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer();
server.listen(3000);
const io = socketIo();

io.attach(server);
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);
  socket.on('action', (action) => {
    if (action.type === 'server/hello') {
      console.log('Got hello data!', action.data);
      socket.emit('action', { type: 'message', data: 'good day!' });
    }
  });
});
