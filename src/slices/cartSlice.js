import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
// import {toast} from "react-hot-toast"

const initialState = {
  cartItemsCount: localStorage.getItem("cartItemsCount")
    ? JSON.parse(localStorage.getItem("cartItemsCount"))
    : 0,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  cartTotalAmount: localStorage.getItem("cartTotalAmount")
    ? JSON.parse(localStorage.getItem("cartTotalAmount"))
    : 0,
};

const cartSlice = createSlice({
  name: "cart slice",
  initialState: initialState,
  reducers: {
    removeFromCart: (state, action) => {
      const courseId = action.payload;
      const index = state.cartItems.findIndex((item) => item._id === courseId);

      if (index !== -1) {
        //course is present in cart
        state.cartItemsCount--;
        state.cartTotalAmount -= state.cartItems[index].price;
        state.cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        localStorage.setItem(
          "cartItemsCount",
          JSON.stringify(state.cartItemsCount)
        );
        localStorage.setItem(
          "cartTotalAmount",
          JSON.stringify(state.cartTotalAmount)
        );
        toast.success("Course removed from cart");
      }
    },
  },
});

export const { removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
