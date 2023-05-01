import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productVariant: [],
};

export const productVariantSlice = createSlice({
  name: 'productVariant',
  initialState,
  reducers: {
    fetchProductVariant: (state, action) => {
      state.productVariant = action.payload;
    },
  },
});

export const { fetchProductVariant } = productVariantSlice.actions;

export default productVariantSlice.reducer;
