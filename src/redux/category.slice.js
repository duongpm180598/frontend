import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: [],
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchCategory } = categorySlice.actions;

export default categorySlice.reducer;
