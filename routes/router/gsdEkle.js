const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");

router.post("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    mysql.getConnection(function(err,conn){
        var ogretmen_email=req.body.ogretmen_email;
        var veli_email=req.body.veli_email;
        var uyku=req.body.uyku;
        var yemek=req.body.yemek;
        var sql="select ogrenci_id from (ogrenci inner join veli on ogrenci.veli_id=veli.veli_id) inner join kullanici on veli.kullanici_id=kullanici.kullanici_id where kullanici.email=(?)";
        conn.query(sql,veli_email,function(err,rows){
            if(err){
                res.status(500).send({error: err})
            }
            else{
                //res.json(rows[0].email);
                //res.sendStatus(200);
                var ogrenci_id=rows[0].ogrenci_id;
                console.log(rows[0].ogrenci_id);
                gonder(ogrenci_id);
            }
        })

        function getOgretmenId(){
            
        }

        function gonder(ogrenci_id){
            var values=[[ogrenci_id],[ilacAdi],[doz],[desc]];
            var sql2="insert into ";
            conn.query(sql2,[values],function(err,rows){
                if(err){
                    res.status(500).send({error : err});
                }
                else{
                    res.status(200).send({success: "success"});
                }
            })
        }
        conn.release();
    })
})



console.log("gsd ekle");

module.exports=router;