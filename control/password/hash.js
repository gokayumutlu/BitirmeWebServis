const scrypt=require("scrypt");

//Password hashing
function hashPassword(pass){
    var key=new Buffer.from(pass);
    var result = scrypt.hashSync(key,{"N":16,"r":1,"p":1},16,"");
    return result.toString("hex");
}

console.log("hash");

module.exports=hashPassword;