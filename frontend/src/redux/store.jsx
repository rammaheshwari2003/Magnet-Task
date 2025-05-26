import { configureStore } from "@reduxjs/toolkit";
import cart from "./cartSlice";

const store=configureStore({
    reducer:{
        cart:cart
    }
})

export default store;
