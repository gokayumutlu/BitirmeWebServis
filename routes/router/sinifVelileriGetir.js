const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");


router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;
        var sql="select concat(kullanici.ad,' ',kullanici.soyad) as veli_adi, kullanici.email as veli_email from kullanici inner join veli on kullanici.kullanici_id=veli.kullanici_id inner join ogrenci on veli.veli_id=ogrenci.veli_id inner join sinif on ogrenci.sinif_id=sinif.sinif_id where sinif.ogretmen_id=(select ogretmen.ogretmen_id from ogretmen inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id where kullanici.email=(?))";
        conn.query(sql,email,function(err,rows){
            if(err){
                res.status(404).send({error: err})
                //res.json(err);
            }
            
            else{
                res.send(JSON.parse(JSON.stringify({veliData: rows})));
                console.log(rows);
                //res.send(JSON.parse(JSON.stringify({ilacData: rows})));
                //console.log(JSON.parse(JSON.stringify(rows)));
            }
        })
        conn.release();
    })
})




console.log("veliler getir");

module.exports=router;