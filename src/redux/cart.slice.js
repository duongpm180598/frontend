import { createSlice } from '@reduxjs/toolkit';
import { getTotalQuantity } from '../utils';
const initialState = {
  cart: [
    { id: '', variant_id: '', name: '', thumbnail: '', weight: '', quantity: '', unit_price: '', size: '', color: '' },
  ],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.cart = action.payload.products;
      state.totalQuantity = action.payload.total;
    },
    addToCart: (state) => {
      state.totalQuantity += 1;
    },
    removeQuantityWhenError: (state) => {
      state.totalQuantity -= 1;
    },

    upQuantity: (state, action) => {
      state.totalQuantity += 1;
      const index = state.cart.findIndex((x) => x.id == action.payload.id);
      state.cart[index].quantity += 1;
    },

    downQuantity: (state, action) => {
      state.totalQuantity -= 1;
      const index = state.cart.findIndex((x) => x.id == action.payload.id);
      state.cart[index].quantity -= 1;
    },
    removeProduct: (state, action) => {
      const newCart = state.cart.filter((x) => x.id != action.payload.id);
      state.cart = newCart;
      state.totalQuantity = getTotalQuantity(state.cart);
    },
  },
});

export const { fetchCart, addToCart, upQuantity, downQuantity, removeQuantityWhenError, removeProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
