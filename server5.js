const io = require('socket.io')();
const request = require('request');
var lineReader = require('line-reader');
lineReader.eachLine('apikey.txt', function(line, last) {
    APIKEY=line;
    if (true) {
        return false; // stop reading
    }
});
const TULING_URL = "http://openapi.tuling123.com/openapi/api/v2";
const redis = require('socket.io-redis');
io.adapter(redis({host:'localhost', port: 6379}));
const moment = require("moment");
//const {client} = require("./redis");

const CHAT_ROBOT="on";
var myDate=new Date();

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
            console.log(socket.id.toString()+":"+myDate.toLocaleString()+":"+msg);
            //client.lpush('danmu', JSON.stringify(data), redis.print);
            if (CHAT_ROBOT=="on"){
                chatRobot(socket,msg);
            }
        });
    });
    
}

function chatRobot(socket,msg){
    postData={
        "reqType":0,
        "perception": {
            "inputText": {
                "text": msg
            }
        },
        "userInfo": {
            "apiKey": APIKEY,
            "userId": "ptrees"
        }
    };
    request({
        url:TULING_URL,
        method:"POST",
        json:true,
        headers:{
            "content-type": "application/json",
        },
        body:postData
    }, function (error,response,body) {
        if (!error && response.statusCode == 200) {
            resultText = body.results[0].values.text;
            console.log(socket.id.toString()+":"+myDate.toLocaleString()+":"+resultText);
            socket.emit("broadcasted danmaku", resultText);
        }
    });
}

io.on("connection",function (socket) {
    socket.on("group1",function () {
        socket.join("group1");
    });
    socket.on("disconnect",function () {
        socket.leave("group1");
    });
});

io.listen(3000);