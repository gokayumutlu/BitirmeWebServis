const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");


router.post("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    var ogretmen_id,veli_id,duyuru_id;
    mysql.getConnection(function(err,conn){
        var ogretmen_email=req.body.ogretmen_email;
        var veli_email=req.body.veli_email;
        var icerik=req.body.icerik;
        var sql="CALL getIdByEmail(?,?,@ogretmen_id,@veli_id); SELECT @ogretmen_id,@veli_id";
        conn.query(sql,[ogretmen_email,veli_email],function(err,rows){
            if(err){
                res.status(500).send({error: err})
            }
            else{
                //res.json(rows[1][0]);
                var string =JSON.stringify(rows[1][0]);
                var object=JSON.parse(string);
                ogretmen_id=object["@ogretmen_id"];
                veli_id=object["@veli_id"];
                //console.log("ogretmen: "+ogretmen_id+" veli: "+veli_id);
                //console.log(rows[1][0]);
                insertDuyuru(ogretmen_id,veli_id);
            }
        });

        function insertDuyuru(ogretmen_idd,veli_idd){
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
                insertDuyuruAlici(duyuru_id,veli_idd);
            }
            });
        }
        
        function insertDuyuruAlici(duyuru_idd){
            var sql3="INSERT INTO duyurualici(alici_id,duyuru_id) VALUES(?,?);"
            conn.query(sql3,[veli_id,duyuru_id],function(err,rows){
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


console.log("duyuru ekle kullanıcı");

module.exports=router;