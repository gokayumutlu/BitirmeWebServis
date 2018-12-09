const express = require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        var userSifre=req.body.sifre;

        var sql="select sifre from kullanici where email=?"
        conn.query(sql,email,function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                //res.json(rows);
                var pass=rows[0].sifre;
                
                var hashedSifre=hashP(userSifre);
                if(hashedSifre==pass){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(500);
                }
            }
        })

    })
});

console.log("login");

module.exports=router;