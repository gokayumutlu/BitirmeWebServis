const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");

router.post("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.body.email;
        var ilacAdi=req.body.ilacAdi;
        var doz=req.body.doz;
        var desc=req.body.desc;
        var sql="select ogrenci_id from (ogrenci inner join veli on ogrenci.veli_id=veli.veli_id) inner join kullanici on veli.kullanici_id=kullanici.kullanici_id where kullanici.email=(?)";
        conn.query(sql,email,function(err,rows){
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

        function gonder(ogrenci_id){
            var values=[[ogrenci_id],[ilacAdi],[doz],[desc]];
            var sql2="insert into ilactakip(ogrenci_id,ilac_adi,adet,aciklama) VALUES(?)";
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







console.log("ilac takip ekle");

module.exports=router;