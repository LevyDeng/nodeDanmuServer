var redis = require("redis");
var client = redis.createClient('6379', '127.0.0.1');

var data1 = {a:1,b:2,c:3};
client.hmset("field1", data1, function (e, r) {
    if (e){
        console.log(e);
    }
    else{
        console.log(r);
        client.hmget("field1", ['a', 'c'], function (e, r) {
            if (e){
                console.log(e);
            }
            else{
                console.log(r);
                client.end(true);
            }
        })
    }
});