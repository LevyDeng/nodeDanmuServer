var engine = require('engine.io');
var http = require('http').createServer().listen(3000);
var server = engine.attach(http);

server.on('connection', function (socket) {
  socket.send(async=true,"欢迎");
  socket.on('message', function (msg) {
      io.emit("broadcasted danmaku",msg);
  });
  socket.on('disconnect', function () { });
});