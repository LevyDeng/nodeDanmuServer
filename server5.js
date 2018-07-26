const io = require('socket.io')();
const redis = require('socket.io-redis');
io.adapter(redis({host:'localhost', port: 6379}));
const moment = require("moment");
const {client} = require("./redis");

var nameBox = [ '/cntv', '/sohuvideo', '/other' ];
for (var item in nameBox){
    var nsp = io.of(nameBox[item]);
    socketMain(nsp, nameBox[item]);
}

function socketMain(nsp, roomName) {
    nsp.on('connection', function (socket) {
        socket.emit("broadcasted danmaku", "欢迎");
        //console.log("Got connection.");
        socket.on('danmaku', function (msg) {
            var data = {"socketid": socket.id, "cid":roomName, "msg":msg, createTime:moment.unix()};
            //io.emit("broadcasted danmaku", msg);
            //nsp.emit("broadcasted danmaku", msg);
            socket.broadcast.emit("broadcasted danmaku", msg);
            console.log(msg);
            //client.lpush('danmu', JSON.stringify(data), redis.print);
        });
    });
    
}

io.listen(3000);