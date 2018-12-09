const express = require("express");
const mysql=require("../../db/db").pool;
const router = express.Router();

function checkEmail(email,callback){
    //var s=0;
    mysql.getConnection(function(err,conn){
        conn.query("select email from kullanici",function(err,rows){
            if(err){
                //res.send("error1");
                console.log("1");
                callback(0);
            }
            if(rows.length>0){
                //console.log(rows[i].email);
                for(var i=0;i<rows.length;i++){
                    //console.log(rows[i].email);
                    if(email==rows[i].email){
                        console.log(rows[i].email);
                        //res.sendStatus(500);
                        //console.log("email:"+email);
                        //console.log("rows[i]:"+rows[i].email);
                        console.log("2");
                        callback(0);
                        break;
                    }
                 
                }
                                 
            }
            else{
                callback(1); 
            }
        });
    })
}
// return 1 olumlu email yok kayıt olunabilir
//return 0 olumsuz email var kayıt olunamaz

/*
router.get("/",(req,res)=>{
    var s=0;
    var email=req.body.email;
    mysql.getConnection(function(err,conn){
        conn.query("select email from kullanici",function(err,rows){
            console.log("query");
            if(err){
                res.send("error1");
            }
            else{
                for(var i=0;i<rows.length;i++){
                    if(email==rows[i].email){
                        console.log(rows[i]);
                        res.sendStatus(500);
                        s=1;
                        break;
                    }
                    
                    
                }
                if(s!=1){
                    res.sendStatus(200);
                }
                
                
            }
            
        });
    })
})
*/



console.log("check");

module.exports=checkEmail;


