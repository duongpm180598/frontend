import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  gateway: '',
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
    setGatewayVNPAY: (state) => {
      state.gateway = 'VNPAY';
    },
    setGatewayZALOPAY: (state) => {
      state.gateway = 'ZALOPAY';
    },
  },
});

export const { statusPending, statusResolve, statusReject, setGatewayVNPAY, setGatewayZALOPAY } =
  statusGlobalSlice.actions;

export default statusGlobalSlice.reducer;
