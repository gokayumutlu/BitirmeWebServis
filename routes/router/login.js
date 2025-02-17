const express = require("express");
const mysql=require("./../../db/db").pool;
const hashP=require("./../../control/password/hash");
const router = express.Router();
const bodyParser=require("body-parser");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;
        var userSifre=req.query.sifre;

        var sql="select sifre from kullanici where email=?"
        conn.query(sql,email,function(err,rows){
            if(err){
                res.status(500).send({error: "error"})
            }
            else{
                var pass=rows[0].sifre;
                console.log("password"+pass);
                var hashedSifre=hashP(userSifre);
                if(hashedSifre==pass){
                    res.status(200).send({success: "success"})
                }
                else{
                    res.status(403).send({forbidden: "forbidden"})
                }
            }
        })

    })
});


/*
router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        var userSifre=req.body.sifre;

        var sql="select sifre from kullanici where email=?"
        conn.query(sql,email,function(err,rows){
            if(err){
                res.sendStatus(500);
            }
            else{
                //res.json(rows);
                var pass=rows[0].sifre;
                console.log("password"+pass);
                var hashedSifre=hashP(userSifre);
                if(hashedSifre==pass){
                    res.sendStatus(200);
                }
                else{
                    res.sendStatus(403);
                }
            }
        })

    })
});
*/

console.log("login");

module.exports=router;
