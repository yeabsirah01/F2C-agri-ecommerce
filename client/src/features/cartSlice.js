import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { logout } from "./userSlice";

const initialState = {
  products: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const createdBy = newProduct.createdBy;

      // Check if all existing products in the cart are from the same createdBy
      const sameVendor = state.products.every((p) => p.createdBy === createdBy);

      if (!sameVendor) {
        toast.error(
          "Sorry, you cannot add products from different vendors to the cart."
        );
        // If not, don't add the new product and return the current state
        return state;
      }

      const existingProduct = state.products.find(
        (p) => p._id === newProduct._id
      );

      if (existingProduct) {
        // If the product already exists in the cart, update its quantity
        existingProduct.quantity += newProduct.quantity;
      } else {
        // Otherwise, add the new product to the cart
        state.products.push(newProduct);
      }

      // Recalculate the total price of all products in the cart
      state.totalPrice = state.products.reduce((acc, p) => {
        return acc + p.quantity * p.price;
      }, 0);

      // Save the updated cart to cookies
      Cookies.set("cart", JSON.stringify(state), { expires: 30 });
      toast.success("Product added to cart");
    },
    // ... other reducers remain the same

    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (p) => p._id !== action.payload._id
      );
      state.totalPrice = state.products.reduce((acc, p) => {
        return acc + p.quantity * p.price;
      }, 0);
      Cookies.set("cart", JSON.stringify(state), { expires: 30 });
    },
    clearCart: (state, action) => {
      Cookies.remove("cart");
      return initialState;
    },
    setCart: (state, action) => {
      return action.payload;
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p._id === productId);

      if (product) {
        product.quantity++;
        state.totalPrice += product.price;

        Cookies.set("cart", JSON.stringify(state), { expires: 30 });
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.products.find((p) => p._id === productId);

      if (product && product.quantity > 1) {
        product.quantity--;
        state.totalPrice -= product.price;

        Cookies.set("cart", JSON.stringify(state), { expires: 30 });
      }
    },
  },
  extraReducers: {
    [logout]: (state, action) => {
      Cookies.remove("cart");
      return initialState;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  clearCart,
  setCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
