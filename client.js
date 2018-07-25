define(['jquery','socketIo'],function(jq,io){

    var sendNode = jq('.j-send');
    var btnNode = jq('.j-btn');
    var contentNode = jq('.j-content');
    //建立连接
    socket = io.connect('ws://127.0.0.1:3001');

    btnNode.on('click',function(){
        var sendText = sendNode.val();
        //向服务端发送信息
        socket.emit("message", {msg:sendText});

    });
    //接收服务端推送的信息
    socket.on("message", function(obj) {
        var curContent = contentNode.html();
        contentNode.html(curContent+obj.msg);
    });
});