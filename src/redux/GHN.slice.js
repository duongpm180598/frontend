import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

export const GHNSlice = createSlice({
  name: 'GHNSlice',
  initialState,
  reducers: {
    fetchProvinces: (state, action) => {
      state.provinces = action.payload;
    },
    fetchDistricts: (state, action) => {
      state.districts = action.payload;
    },
    fetchWards: (state, action) => {
      state.wards = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { fetchProvinces, fetchDistricts, fetchWards } = GHNSlice.actions;

export default GHNSlice.reducer;
