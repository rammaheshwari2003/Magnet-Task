import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaCartArrowDown } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {Link, useNavigate} from "react-router-dom";

const Header=()=>{
  const navigate=useNavigate();
   const Product=useSelector(state=>state.cart.cart);
  const ProductLenght=Product.length;
    return(
        <>
         <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Product</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="home">Home</Nav.Link>
           </Nav>
        </Container>
        <div id="icon">
            <FaCartArrowDown onClick={()=>navigate("/cart")} />
             <span>{ProductLenght}</span>
        </div>
      </Navbar>
        </>
    )
}
export default Header;
