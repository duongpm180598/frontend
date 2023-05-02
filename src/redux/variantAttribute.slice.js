import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  variantAttribute: [],
};

export const variantAttributeSlice = createSlice({
  name: 'variantAttribute',
  initialState,
  reducers: {
    fetchVariantAttribute: (state, action) => {
      state.variantAttribute = action.payload;
    },
  },
});

export const { fetchVariantAttribute } = variantAttributeSlice.actions;

export default variantAttributeSlice.reducer;
