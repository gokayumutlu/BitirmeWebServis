const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const underscore=require("underscore");

router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;
        var sql="select concat(ogrenci.ad, ' ', ogrenci.soyad) as ogrenci, ilac_adi, adet, aciklama from ((((ilactakip inner join ogrenci on ilactakip.ogrenci_id=ogrenci.ogrenci_id) inner join sinif on ogrenci.sinif_id=sinif.sinif_id) inner join ogretmen on sinif.ogretmen_id=ogretmen.ogretmen_id) inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id) where kullanici.email=(?)";
        conn.query(sql,email,function(err,rows){
            console.log(email);
            if(err){
                res.status(404).send({error: err})
                //res.json(err);
            }
            
            else{
                
                res.send(JSON.parse(JSON.stringify({ilacData: rows})));
                console.log(JSON.parse(JSON.stringify(rows)));
            }
        })
        conn.release();
    })
})


console.log("ilac takip getir");

module.exports=router;