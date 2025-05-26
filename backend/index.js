const express=require("express");
const app=express();
const cors=require("cors");
const bodyParser = require("body-parser");
const PaymentRoute=require("./route/payment");
const { default: mongoose } = require("mongoose");

require("dotenv").config();
const port=process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.DBCONNECT).then(()=>{
    console.log("Db Connected");
}).catch((err)=>{
    console.log(err);
})
app.use("/payment",PaymentRoute);

app.listen(port, ()=>{
    console.log(`Server Run on ${port} Port`);
})
