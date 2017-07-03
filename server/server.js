const path = require('path');
const socketIo = require('socket.io');
const express = require('express');
const serve = require('express-static');

const io = socketIo();
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.use(serve(path.join(__dirname, '../build/')));

const server = app.listen(3000, () => {
  console.log('server is running at %s', server.address().port);
});

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
