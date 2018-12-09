const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");

//Belli bir kullanıcı silme
router.delete("/:id",(req,res)=>{
    mysql.getConnection(function(err,conn){
        var id=req.params.id;
        var sql="delete from kullanici where kullanici_id=?";
        conn.query(sql,id,function(err,rows){
            if(err){
                res.send(err);
            }
            else{
                res.json(rows);
            }
        });
        conn.release();
    })
});

console.log("deleteUser");

module.exports=router;