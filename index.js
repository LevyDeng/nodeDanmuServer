var app = require("express")();
var http = require("http").Server(app);
var io = require('socket.io')(http);
//const redis = require('socket.io-redis');
//const {client} = require('/redis');
//const moment = require('moment');

app.get('/', function (req, res) {
   res.send("Hello");
});

//io.adapter(redis({host:'localhost', port:6379}));

//var nameBox = ['/chatroom','/live','/vod','/wechat','/broadcast'];
/*
for (var item in nameBox){
    var nsp = io.of(nameBox[item]);
    socketMain(nsp, nameBox[item]);
}
*/
http.listen(80, function () {
    console.log('listening on *:80');
});

io.on('connection', function (socket) {
    io.emit("Hello");
    console.log("Got one connection.");
    socket.on('connect',function () {
       console.log('Got connection.');
    });
    socket.on('disconnect', function () {
        console.log('disconnected.');
    });
    socket.on('danmaku', function (msg) {
        io.emit('danmaku', msg);
    });
});
