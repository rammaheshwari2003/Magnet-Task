import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from "react-redux";
import { addtocart } from "../redux/cartSlice";

const Home=()=>{
    const [data, setData]=useState([]);
    const dispatch=useDispatch();

    
    const loadData=async()=>{
        let api="https://fakestoreapiserver.reactbd.com/walmart";
        let response=await axios.get(api);
     setData(response.data);
    
    }

    useEffect(()=>{
        loadData();
    },[])

   const Products=data.map((key)=>{
        return(
            <>
            <Card style={{ width: '18rem' }}>
      <img src={key.image} style={{marginLeft:"20px", width:"250px"}} /> 
      <Card.Body>
        <Card.Title>{key.title}</Card.Title>
        <Card.Text>
            <h6>Brand : <span>{key.brand}</span></h6>
            <h6>Category : <span>{key.category}</span></h6>
          <h6>MRP : <span id="mrp">{key.oldPrice}</span></h6>
          <h6>Price : <span>{key.price}</span></h6>
        </Card.Text>
        <Button variant="primary" onClick={()=>dispatch(addtocart({...key,qnty:1}))}>Add to Cart</Button>
      </Card.Body>
    </Card>
            </>
        )
   })

    return(
        <>
    <br />
    <div id="cart">
        {Products}
    </div>


        </>
    )
}
export default Home;
