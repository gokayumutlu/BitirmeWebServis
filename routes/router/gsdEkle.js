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
        var ogrenci_id=req.body.ogrenci_id;
        var uyku_b=req.body.uyku;
        var yemek_b=req.body.yemek;
        getOgretmenId(ogretmen_email,ogrenci_id,uyku_b,yemek_b);

        function getOgretmenId(ogretmen_emaill,ogrenci_idd,uyku_bb,yemek_bb){
            var sql3="select ogretmen.ogretmen_id from ogretmen inner join kullanici on ogretmen.kullanici_id=kullanici.kullanici_id where kullanici.email=(?)";
            conn.query(sql3,ogretmen_emaill,function(err,rows){
                if(err){
                    res.status(500).send({error: err})
                }
                else{
                    //res.json(rows[0].ogretmen_id);
                    var ogretmen_iddd=rows[0].ogretmen_id;
                    gonder(ogretmen_iddd,ogrenci_idd,uyku_bb,yemek_bb);

                }
            })
        }

        function gonder(ogretmen_idddd,ogrenci_iddd,uyku_bbb,yemek_bbb){
            var values=[[ogretmen_idddd],[ogrenci_iddd],[uyku_bbb],[yemek_bbb],[formatted]];
            var sql2="insert into gunsonudegerlendirmesi(ogretmen_id,ogrenci_id,yemek,uyku,tarih) values(?)";
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