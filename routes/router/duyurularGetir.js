const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");




router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;
        sql="select concat(kullanici.ad,' ',kullanici.soyad) as veli, sinif.sinif_adi, sinif.sinif_id, veli.veli_id from sinif inner join ogrenci on sinif.sinif_id=ogrenci.sinif_id inner join veli on ogrenci.veli_id=veli.veli_id inner join kullanici on veli.kullanici_id=kullanici.kullanici_id where kullanici.email=?";
        conn.query(sql,email,function(err,rows){
            if(err){
                res.status(500).send({error: err})
            }
            else{
                //res.json(rows);
                var veli_adi=rows[0].veli;
                var sinif_adi=rows[0].sinif_adi;
                var sinif_id=rows[0].sinif_id;
                var veli_id=rows[0].veli_id;
                console.log(veli_adi+" "+sinif_adi);

                duyurulariGetir(veli_id,sinif_id);

            }
        });

        function duyurulariGetir(veli_idd,sinif_idd){
            var params=[veli_idd,sinif_idd];
            var sql2="select duyuru.icerik, duyuru.olusturulma_tarihi, duyurualici.alici_id, duyurualici.alici_sinif_id from duyuru inner join duyurualici on duyuru.duyuru_id=duyurualici.duyuru_id where duyurualici.alici_id=? UNION SELECT duyuru.icerik, duyuru.olusturulma_tarihi, duyurualici.alici_id, duyurualici.alici_sinif_id from duyuru inner join duyurualici on duyuru.duyuru_id=duyurualici.duyuru_id where duyurualici.alici_sinif_id=?";
            conn.query(sql2,params,function(err,rows){
                if(err){
                  res.status(500).send({error: err});
                }
                else{
                    res.json(rows);
                    console.log(rows);
                }
            });
        }



        conn.release();
    })
})





console.log("duyurular getir");

module.exports=router;