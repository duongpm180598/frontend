import {} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './category.slice';
import variantAttributeSlice from './variantAttribute.slice';
const store = configureStore({
  reducer: {
    category: categorySlice,
    variantAttribute: variantAttributeSlice,
  },
});

export default store;
