const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");


router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var ogretmen_email=req.query.email;
        var sql="SELECT concat(ogrenci.ad,' ',ogrenci.soyad) as ogrenci, ogrenci.ogrenci_id as ogrenci_id from ogrenci inner join sinif on ogrenci.sinif_id=sinif.sinif_id inner join ogretmen on sinif.ogretmen_id=ogretmen.ogretmen_id inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id where kullanici.email=?";
        conn.query(sql,ogretmen_email,function(err,rows){
            if(err){
                res.status(404).send({error: err})
                //res.json(err);
            }
            
            else{
                res.send(JSON.parse(JSON.stringify({ogrenciData: rows})));
                console.log(rows);
                //res.send(JSON.parse(JSON.stringify({ilacData: rows})));
                //console.log(JSON.parse(JSON.stringify(rows)));
            }
        })
        conn.release();
    })
})

console.log("ogrenciler getir");

module.exports=router;