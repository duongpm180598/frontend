import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listOrder: [
    {
      code: '',
      status: '',
      created_at: '',
      thumbnail: '',
      tracking: {
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        province: '',
        district: '',
        ward: '',
        line: '',
      },
      payment: {
        gateway: '',
        amount: '',
      },
    },
  ],
  totalOrder: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrder: (state, action) => {
      state.listOrder = action.payload;
    },
    fetchTotalOrder: (state, action) => {
      state.totalOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchOrder, fetchTotalOrder } = orderSlice.actions;

export default orderSlice.reducer;
