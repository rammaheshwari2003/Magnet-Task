import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {loadStripe} from "@stripe/stripe-js";

const Checkout=()=>{
    const [shippingdata, setShippingData]=useState({});
      const Product=useSelector(state=>state.cart.cart);

      let netAmount=0;
   const ProductDetail=Product.map((key)=>{
    netAmount+=key.qnty*key.price;
    return(
      <tr style={{textAlign:"center"}}>
        <td><img src={key.image} width="50px" height="50px"/></td>
        <td>{key.title}</td>
        <td>{key.qnty * key.price}</td>
        
      </tr>
      
    )
    
   })


    const handleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setShippingData({...shippingdata,[name]:value});
    }
    
    const stripePromise=loadStripe("pk_test_51ROrsn04p4Hh6QCwxavwOvzVEQZ6P5sqTKQxTlXTFJzNhCDDQ1v6NKvxjnhQxwg4CReqVQrcPcadaSy7THis2DlR00fae9ucoI")
    const handlePay=async()=>{
        
        try {
           const stripe=await stripePromise;
           const api="http://localhost:8000/payment/stripe-payment"
            const formatData=Product.map(item=>({
                pname:item.title,
                price:item.price,
                qnty:item.qnty,
                image:`${item.image}`
            }))
            let response=await axios.post(api,{Product:formatData,User:shippingdata});
            const session=response.data;
            if(!session.id){
                console.log("Stripe session not required", session);
                return;
            }
            const result=await stripe.redirectToCheckout({
                sessionId:session.id,
            });
            if(result.error){
                console.log("Stripe error",result.error.message);
            }
        } catch (error) {
            console.error("Payment initiation failed",error);
        }
    }

    return(
        <>
        <br />

        <div id="checkout">
        <Table striped bordered hover style={{textAlign:"center", height:"5px"}}>
      <thead>
        <tr>
          <th></th>
          <th>Product Name</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody >
       {ProductDetail}
        
      </tbody>
    </Table>


      
        {/* <div id="form" style={{marginLeft:"150px",padding:"20px",borderRadius:"20px"}}> */}
        <form id="form" style={{marginLeft:"150px",padding:"20px",borderRadius:"20px"}}>
            <h3>Shipping Address</h3> <br />
            <label>Enter Name</label>
            <input type="text" name="name" onChange={handleInput} required/>
            <label>Enter Email</label>
            <input type="email" name="email" onChange={handleInput} required/>
            <label>Enter Mobile No.</label>
            <input type="number" name="mobile"  onChange={handleInput} required/>
            <label>Enter Address</label>
            <input type="text" name="address"  onChange={handleInput} required/>
            <label>Enter Pincode</label>
            <input type="number" name="pincode"  onChange={handleInput} required/> <br />
      <Button variant="success" onClick={handlePay}>Pay Now</Button>
        
        </form>
</div>
{/* </div> */}

        </>
    )
}
export default Checkout;
