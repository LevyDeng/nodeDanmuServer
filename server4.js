const io = require('socket.io')();
const redis = require('socket.io-redis');
io.adapter(redis({host:'localhost', port: 6379}));
const moment = require("moment");
const {client} = require("./redis");

io.on('connection', function (socket) {
    socket.emit("broadcasted danmaku", "欢迎");
    //console.log("Got connection.");
    socket.on('danmaku', function (msg) {
        var data = {"socketid": socket.id, "msg":msg, createTime:moment.unix()};
        //io.emit("broadcasted danmaku", msg);
        io.emit("broadcasted danmaku", msg.toString());
        console.log(data);
        //client.lpush('danmaku', JSON.stringify(data), redis.print);
    });
    socket.on("error", function (err) {
        console.log(err);
    })
});

io.listen(80);