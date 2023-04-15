import {} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './category.slice';
import variantAttributeSlice from './variantAttribute.slice';
import productsSlice from './products.slice';
const store = configureStore({
  reducer: {
    category: categorySlice,
    variantAttribute: variantAttributeSlice,
    product: productsSlice,
  },
});

export default store;
