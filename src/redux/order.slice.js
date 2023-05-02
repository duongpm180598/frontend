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
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    fetchOrder: (state, action) => {
      state.listOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchOrder } = orderSlice.actions;

export default orderSlice.reducer;
