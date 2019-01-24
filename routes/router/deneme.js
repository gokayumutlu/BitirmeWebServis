const express = require("express");
const mysql=require("./../../db/db").pool;
const router = express.Router();
const bodyParser=require("body-parser");
const dateTime=require("node-datetime");

router.get("/",(req,res)=>{
    const dt=dateTime.create();
    const formatted=dt.format("y/m/d");
    var newDate=new Date(formatted.toString());
    console.log(newDate);
})

console.log("deneme");

module.exports=router;