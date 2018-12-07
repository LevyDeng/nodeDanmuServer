var socket = require('socket.io-client')('http://localhost:3000');
socket.on('connect', function(){
    socket.emit("danmaku","hehe");
});
socket.on('broadcasted danmaku', function(data){
    console.log(data);
});
socket.on('disconnect', function(){});