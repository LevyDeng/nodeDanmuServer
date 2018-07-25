var socket = require('socket.io-client')('http://localhost');
socket.on('connect', function(){
    socket.emit("danmaku","hehe");
});
socket.on('broadcasted danmaku', function(data){
    console.log(data);
});
socket.on('disconnect', function(){});