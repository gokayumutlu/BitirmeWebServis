const mysql=require("mysql");
const pool=mysql.createPool({
    host:"raffle.guzelhosting.com",
    user:"gokayumu_user1",
    port:"3306",
    password:"user_182274",
    database:"gokayumu_anaokulu",
    multipleStatements:true
});

console.log("db");

exports.pool=pool;




