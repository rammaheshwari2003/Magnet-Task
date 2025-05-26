import React from "react";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from "react-redux";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { qntyInc,qntyDec ,removeItem} from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";


const Cart=()=>{
  const Product=useSelector(state=>state.cart.cart);
  const disptch=useDispatch();
  const navigate=useNavigate();

  let netAmount=0;
   const ProductDetail=Product.map((key)=>{
    netAmount+=key.qnty*key.price;
    return(
      <tr style={{textAlign:"center"}}>
        <td><img src={key.image} width="100px"/></td>
        <td>{key.title}</td>
        <td>{key.brand}</td>
        <td>{key.category}</td>
        <td>{key.price}</td>
        <td>
        <CiCircleMinus style={{fontSize:"25px"}} onClick={()=>disptch(qntyDec({id:key._id}))} />
        {key.qnty}
        <CiCirclePlus style={{fontSize:"25px"}} onClick={()=>disptch(qntyInc({id:key._id}))} />
        </td>
        <td>{key.qnty * key.price}</td>
        <td>
          <Button variant="warning" onClick={()=>disptch(removeItem({id:key._id}))}>Remove</Button>

        </td>
        
      </tr>
      
    )
    
   })

    return(
        <>
            <Table striped bordered hover style={{textAlign:"center"}}>
      <thead>
        <tr>
          <th></th>
          <th>Product Name</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>
       {ProductDetail}
        
      </tbody>
    </Table>

    <div id="netamount">
       <h4>Total Payable Amount : <span style={{color:"green"}}>{netAmount}</span></h4> 
        <Button variant="primary" onClick={()=>navigate("/checkout")}>Checkout</Button>

      </div>
        </>
    )
}
export default Cart;
