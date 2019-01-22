const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");

router.post("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    var ogretmen_id,duyuru_id,sinif_id;
    mysql.getConnection(function(err,conn){
        var ogretmen_email=req.body.ogretmen_email;
        var icerik=req.body.icerik;
        var sql="select ogretmen.ogretmen_id from ogretmen inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id where kullanici.email=(?)";
        conn.query(sql,ogretmen_email,function(err,rows){
            if(err){
                res.status(500).send({error: err})
            }
            else{
                ogretmen_id=rows[0].ogretmen_id;
                //console.log(rows[0].ogretmen_id);
                insertDuyuru(ogretmen_id);
            }
        });

        function insertDuyuru(ogretmen_idd){
            var sql2="INSERT INTO duyuru(ogretmen_id,icerik,olusturulma_tarihi) VALUES(?,?,?); SELECT LAST_INSERT_ID();";
            conn.query(sql2,[ogretmen_idd,icerik,formatted],function(err,rows){
            if(err){
                res.status(500).send({error: err});
            }
            else{
                var string =JSON.stringify(rows[1][0]);
                var object=JSON.parse(string);
                duyuru_id=object["LAST_INSERT_ID()"];
                //console.log(duyuru_id);
                getSinifId(duyuru_id,ogretmen_idd);
            }
            });
        }

        function getSinifId(duyuru_idd,ogretmen_iddd){
            var sql2="select sinif.sinif_id from sinif inner join ogretmen on sinif.ogretmen_id=ogretmen.ogretmen_id where ogretmen.ogretmen_id=(?)";
            conn.query(sql2,ogretmen_iddd,function(err,rows){
            if(err){
                res.status(500).send({error: err});
            }
            else{
                console.log(rows[0].sinif_id);
                sinif_id=rows[0].sinif_id;
                insertDuyuruAlici(duyuru_idd,sinif_id);
            }
            });
        }
        
        function insertDuyuruAlici(duyuru_iddd,sinif_idd){
            var sql3="INSERT INTO duyurualici(alici_sinif_id,duyuru_id) VALUES(?,?);"
            conn.query(sql3,[sinif_idd,duyuru_iddd],function(err,rows){
            if(err){
                res.status(500).send({error: err});
            }
            else{
                res.status(200).send({succ: rows});
                console.log(rows);
            }
            });
        }

        
        

        conn.release();
    })
})





console.log("duyuru ekle sinif");

module.exports=router;