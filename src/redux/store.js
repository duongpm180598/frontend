import {} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './category.slice';
const store = configureStore({
  reducer: {
    category: categorySlice,
  },
});

export default store;
