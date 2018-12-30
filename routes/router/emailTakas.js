const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();



router.get("/",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var email=req.query.email;

        var sql="select kullanici.email from ((((kullanici inner join ogretmen on kullanici.kullanici_id=ogretmen.kullanici_id) inner join sinif on ogretmen.ogretmen_id=sinif.ogretmen_id) inner join ogrenci on sinif.sinif_id=ogrenci.sinif_id) inner join veli on ogrenci.veli_id=veli.veli_id) where veli.veli_id=(SELECT veli.veli_id from kullanici INNER join veli on kullanici.kullanici_id=veli.kullanici_id where kullanici.email=?)"
        conn.query(sql,email,function(err,rows){
            if(err){
                res.status(500).send({error: "error"})
            }
            else{
                res.status(200).send({email:rows[0].email});
            }
        })

    })
});






console.log("email takas");

module.exports=router;