const express=require("express");
const app=express();
const morgan=require("morgan");
const mysql=require("mysql");
const bodyParser=require("body-parser");

const deneme=require("./routes/router/deneme");
const userRouter=require("./routes/router/users");
const signupRouter=require("./routes/router/signup");
const deleteUser=require("./routes/router/deleteUser");
const loginRouter=require("./routes/router/login");
const emailTakasRouter=require("./routes/router/emailTakas");
const ilacTakipEkle=require("./routes/router/ilacTakibiEkle");
const ilacTakipGetir=require("./routes/router/ilacTakipGetir");
const duyuruEkleKullanici=require("./routes/router/duyuruEkleKullanici");
const duyuruEkleSinif=require("./routes/router/duyuruEkleSinif");
const sinifVelileriGetir=require("./routes/router/sinifVelileriGetir");
const gsdEkle=require("./routes/router/gsdEkle");
const sinifOgrencileriGetir=require("./routes/router/sinifOgrencileriGetir");
const duyuruGetir=require("./routes/router/duyuruGetir");
const duyurularGetir=require("./routes/router/duyurularGetir");
const ovControl=require("./routes/router/ovControl");
//const checkRouter=require("./control/email/check");

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended:false}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});

app.use("/deneme",deneme);
app.use("/users",userRouter);
app.use("/signup",signupRouter);
app.use("/deleteUser",deleteUser);
app.use("/login",loginRouter);
app.use("/emailtakas",emailTakasRouter);
app.use("/ilactakipekle",ilacTakipEkle);
app.use("/ilactakipgetir",ilacTakipGetir);
app.use("/duyuruekullanici",duyuruEkleKullanici);
app.use("/duyuruesinif",duyuruEkleSinif);
app.use("/sinifvgetir",sinifVelileriGetir);
app.use("/gsdekle",gsdEkle);
app.use("/sinifogetir",sinifOgrencileriGetir);
app.use("/duyurugetir",duyuruGetir);
app.use("/duyurulargetir",duyurularGetir);
app.use("/ovcontrol",ovControl);
//app.use("/check",checkRouter);

console.log("app");

module.exports=app;
