const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");


router.post("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        sql="select kullanici.email as email from kullanici inner join ogretmen on kullanici.kullanici_id=ogretmen.kullanici_id where ogretmen.ogretmen_id in (select ogretmen.ogretmen_id from ogretmen inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id where kullanici.email=?)";
        conn.query(sql,email,function(err,rows){
            if(err){
                res.status(500).send({error: err})
            }
            else{
                if(rows[0]==null){
                    res.status(403).send({ninclude: "ninclude"})
                }
                else{
                    res.json(rows[0].email);
                }
                
            }
        });

        

        
        conn.release();
    })
})





console.log("ovcontrol");

module.exports=router;