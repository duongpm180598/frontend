import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  totalProducts: 0,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProducts: (state, action) => {
      state.products = action.payload;
    },
    fetchTotalProduct: (state, action) => {
      state.totalProducts = action.payload;
    },
  },
});

export const { fetchProducts, fetchTotalProduct } = productsSlice.actions;

export default productsSlice.reducer;
