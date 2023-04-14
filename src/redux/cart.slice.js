import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

export const productsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { fetchProducts } = productsSlice.actions;

export default productsSlice.reducer;
