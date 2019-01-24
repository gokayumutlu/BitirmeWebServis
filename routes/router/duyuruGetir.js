const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");

router.get("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("Y-m-d");
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
                console.log(formatted);

                duyuruGetir(veli_id,sinif_id);

            }
        });

        function duyuruGetir(veli_idd,sinif_idd){
            var params=[veli_idd,formatted,sinif_idd,formatted];
            sql="select duyuru.icerik, duyuru.olusturulma_tarihi from duyuru inner join duyurualici on duyuru.duyuru_id=duyurualici.duyuru_id where duyurualici.alici_id=? and duyuru.olusturulma_tarihi=? UNION SELECT duyuru.icerik, duyuru.olusturulma_tarihi from duyuru inner join duyurualici on duyuru.duyuru_id=duyurualici.duyuru_id where duyurualici.alici_sinif_id=? and duyuru.olusturulma_tarihi=?"
            conn.query(sql,params,function(err,rows){
                if(err){
                    res.status(500).send({error: err})
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



console.log("duyuru getir");

module.exports=router;