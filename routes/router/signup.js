const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();



router.post("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        conn.query("",function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                res.json(rows);
            }
            
        });
        conn.release();
    })
});






console.log("qweasd");

module.exports=router;