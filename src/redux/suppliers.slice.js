import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  suppliers: [],
};

export const supplierSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    fetchSuppliers: (state, action) => {
      state.suppliers = action.payload;
    },
  },
});

export const { fetchSuppliers } = supplierSlice.actions;

export default supplierSlice.reducer;
