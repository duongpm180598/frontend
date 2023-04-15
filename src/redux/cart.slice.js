import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [{ id: '', name: '', thumbnail: '', quantity: '', unit_price: '', size: '', color: '' }],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchCart: (state, action) => {
      state.cart = action.payload;
      state.totalQuantity = state.cart.length;
    },
    addToCart: (state) => {
      state.totalQuantity += 1;
    },
    removeQuantityWhenError: (state) => {
      state.totalQuantity -= 1;
    },
    upQuantity: (state, action) => {},
    downQuantity: (state, action) => {},
  },
});

export const { fetchCart, addToCart, upQuantity, downQuantity, removeQuantityWhenError } = cartSlice.actions;

export default cartSlice.reducer;
