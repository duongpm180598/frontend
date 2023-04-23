import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
};

export const statusGlobalSlice = createSlice({
  name: 'statusGlobal',
  initialState,
  reducers: {
    statusPending: (state) => {
      state.status = 'pending';
    },
    statusResolve: (state) => {
      state.status = 'resolve';
    },
    statusReject: (state) => {
      state.status = 'reject';
    },
  },
});

export const { statusPending, statusResolve, statusReject } = statusGlobalSlice.actions;

export default statusGlobalSlice.reducer;
