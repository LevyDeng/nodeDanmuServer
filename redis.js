var redis = require("redis");
var client = redis.createClient("6379", "127.0.0.1");

client.on("error",function (err) {
    console.log(err);
});

module.exports = {
    client:client
};