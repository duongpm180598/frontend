import {} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './category.slice';
import variantAttributeSlice from './variantAttribute.slice';
import productsSlice from './products.slice';
import cartSlice from './cart.slice';
import GHNSlice from './GHN.slice';
const store = configureStore({
  reducer: {
    category: categorySlice,
    variantAttribute: variantAttributeSlice,
    product: productsSlice,
    cart: cartSlice,
    GHN: GHNSlice,
  },
});

export default store;
