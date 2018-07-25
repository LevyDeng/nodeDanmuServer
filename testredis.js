var redis = require("redis");
var client = redis.createClient('6379', '127.0.0.1');

client.set('key1', 'AAA', function (err, res) {
   if (err){
       console.log(err);
   }
   else{
       console.log(res);
       client.get('key1', function (err, res) {
           if (err){
                console.log(err);
           }
           else{
               console.log(res);
               client.end(true);
           }
       })
   }
});