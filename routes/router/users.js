const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const dateTime=require("node-datetime");

router.get("/ogretmen",(req,res)=>{
    mysql.getConnection(function(err,conn){
        conn.query("select * from kullanici",function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                res.json(rows);
            }
        });
        conn.release();
    });
});

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        conn.query("select * from ogretmen",function(err,rows){
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

console.log("users");

module.exports=router;
