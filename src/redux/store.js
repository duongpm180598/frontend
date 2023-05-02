import {} from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import categorySlice from './category.slice';
import variantAttributeSlice from './variantAttribute.slice';
import productsSlice from './products.slice';
import cartSlice from './cart.slice';
import GHNSlice from './GHN.slice';
import orderSlice from './order.slice';
import statusGlobalSlice from './status.slice';
import supplierSlice from './suppliers.slice';
import productVariantSlice from './productVariant.slice';
import statisticSlice from './statistic.slice';

const store = configureStore({
  reducer: {
    category: categorySlice,
    variantAttribute: variantAttributeSlice,
    product: productsSlice,
    cart: cartSlice,
    GHN: GHNSlice,
    order: orderSlice,
    status: statusGlobalSlice,
    suppliers: supplierSlice,
    productVariant: productVariantSlice,
    statisticData: statisticSlice,
  },
});

export default store;
