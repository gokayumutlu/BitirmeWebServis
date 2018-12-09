const express = require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const emailCheck=require("./../../control/email/check");

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
        var sifre=hashP(req.body.sifre);
        var kayit=formatted;
        var r=0;
        conn.query("select email from kullanici",function(err,rows){
            if(err){
                res.send(500);
                console.log("log 1");
            }
            else{
                for(var i=0;i<rows.length;i++){
                    if(email==rows[i].email){
                        console.log("aynı email bulundu "+rows[i].email);
                        r=1;
                        break;
                    }
                    else{
                        r=0;
                    }
                 
                }

                exists(r);
            }

        })
        
        function exists(exists){
            if(exists==0){
                var sql="insert into kullanici (ad,soyad,email,sifre,kayit_tarihi) values (?)";
                var values=[[ad],[soyad],[email],[sifre],[kayit]];
                conn.query(sql,[values],function(err,rows){
                    if(err){
                        res.send(err);
                        console.log("log 2");
                    }
                    else{
                        console.log("log 3");
                        res.json(rows);
                    }
                });
                
            }
            else{
                console.log("log 4");
                res.send("kullanıcı var başka mail gir");
            }
            
        
        }
        conn.release();
    })
});






console.log("signUp");

module.exports=router;