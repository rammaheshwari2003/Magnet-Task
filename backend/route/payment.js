const express=require("express");
const route=express.Router();
const stripe=require("stripe")("sk_test_51ROrsn04p4Hh6QCwjeadnCNY2ZE2mde5v5EqBoBRH0AJ2GxNKbRAUth9gnJ4dug0Awr1wBb3UttzWL2e2p5VmBI000bC7xCnPv");
const orderModel=require("../model/OrderModel");

route.post("/stripe-payment",async(req,res)=>{
    console.log(req.body)
    try {
        const {Product ,User}=req.body;
        const line_items=Product.map((item)=>({
             price_data:{
                currency: "inr",
                 product_data: {
                 name: item.pname,      
                 images: [item.image],
                },
                 unit_amount: item.price*100,
             },
            quantity: item.qnty,
        }));
         const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `http://localhost:5173/success`,
          cancel_url: `http://localhost:5173/cancel`,
        })
        const totalAmount=Product.reduce((acc,item)=>acc+item.price * item.qnty,0);
        const data=await orderModel.create({
            name:User.name,
            email:User.email,
            mobile:User.mobile,
            address:User.address,
            pincode:User.pincode,
            orderItems:Product,
            productName:Product.pname,
            orderAmount:totalAmount,
            orderId:session.id

        })
        res.json({id:session.id});
    } catch (error) {
         console.error("Stripe Error:", error.message);
      res.status(500).json({ error: "Failed to create checkout session" });
    }
})


module.exports=route;

