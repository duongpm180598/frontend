import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statisticData: [],
};

export const statisticSlice = createSlice({
  name: 'productVariant',
  initialState,
  reducers: {
    fetchStatisticData: (state, action) => {
      state.statisticData = action.payload;
    },
  },
});

export const { fetchStatisticData } = statisticSlice.actions;

export default statisticSlice.reducer;
