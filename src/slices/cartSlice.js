import { createSlice } from "@reduxjs/toolkit";
// import {toast} from "react-hot-toast"

const initialState = {
    cartItemsCount: localStorage.getItem('cartItemsCount') ? JSON.parse(localStorage.getItem('cartItemsCount')) : 0,
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
};

const cartSlice = createSlice({
    name:"cart slice",
    initialState:initialState,
    reducers:{
        
    },
});

export const {setTotalItems} = cartSlice.actions;
export default cartSlice.reducer
