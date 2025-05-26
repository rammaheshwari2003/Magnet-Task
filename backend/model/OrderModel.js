const mongoose=require("mongoose");

const orderSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    mobile:Number,
    pincode:Number,
    orderId:String,
    orderItems:[],
    productName:String,
    orderAmount:String
})

module.exports=mongoose.model("oder",orderSchema);
