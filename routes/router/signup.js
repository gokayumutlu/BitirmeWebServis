const express = require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
//const scrypt=require("scrypt");
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");

router.post("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    mysql.getConnection(function(err,conn){
        var ad=req.body.ad;
        var soyad=req.body.soyad;
        var email=req.body.email;
        //var sifre=req.body.sifre;
        /*
        var key=new Buffer.from(req.body.sifre);
        var result = scrypt.hashSync(key,{"N":16,"r":1,"p":1},16,"");  
        sifre=result.toString("hex");
        */
        var sifre=hashP(req.body.sifre);
        var kayit=formatted;
        var sql="insert into kullanici (ad,soyad,email,sifre,kayit_tarihi) values (?)";
        var values=[[ad],[soyad],[email],[sifre],[kayit]];
        conn.query(sql,[values],function(err,rows){
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






console.log("signUp");

module.exports=router;