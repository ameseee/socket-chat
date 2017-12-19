var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  socket.broadcast.emit('new connection',
  { text: 'A friend has connected' });

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('typing', (nickname) => {
    io.emit('friend typing', nickname);
  });
  
  socket.on('empty', () => {
    io.emit('not typing');
  });

  socket.on('disconnect', () => {
    io.emit('lost connection',
    { text: 'Someone has disconnected' });
  });

});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
