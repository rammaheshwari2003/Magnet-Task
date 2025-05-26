import {createSlice} from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"cart",
    initialState:{
        cart:[]
    },
    reducers:{
        addtocart:(state,actions)=>{
      const data=state.cart.filter(key=>key._id == actions.payload._id);
      if(data.length >=1){
        alert("Product Already Added");
      }else{
            state.cart.push(actions.payload);
      } 
    },
    qntyInc:(state,actions)=>{
        console.log(actions.payload)
        for(var i=0; i<state.cart.length; i++){
            if(state.cart[i]._id == actions.payload.id){
                state.cart[i].qnty++;
            }
        }
    },
    qntyDec:(state,actions)=>{
        for(var i=0; i<state.cart.length; i++){
            if(state.cart[i]._id == actions.payload.id){
                if(state.cart[i].qnty <=1){
                    alert("Product not less then zero")
                }else{
                    state.cart[i].qnty--;
                }
            }
        }
    },
    removeItem:(state,actions)=>{
       state.cart=state.cart.filter(key=> key._id != actions.payload.id);
    }

        }
})

export const {addtocart,qntyInc,qntyDec,removeItem}=cartSlice.actions;
export default cartSlice.reducer;
