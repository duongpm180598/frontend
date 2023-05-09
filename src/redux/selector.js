import { createSelector } from '@reduxjs/toolkit';

export const getCategory = (state) => state.category.category;
export const getVariantAttribute = (state) => state.variantAttribute.variantAttribute;
export const getProducts = (state) => state.product.products;
export const getTotalProducts = (state) => state.product.totalProducts;
export const getCart = (state) => state.cart.cart;
export const getTotalQuantity = (state) => state.cart.totalQuantity;
export const getProvinces = (state) => state.GHN.provinces;
export const getDistricts = (state) => state.GHN.districts;
export const getWards = (state) => state.GHN.wards;
export const getOrder = (state) => state.order.listOrder;
export const getTotalOrder = (state) => state.order.totalOrder;
export const getStatus = (state) => state.status.status;
export const getGateway = (state) => state.status.gateway;
export const getSuppliers = (state) => state.suppliers.suppliers;
export const getProductVariant = (state) => state.productVariant.productVariant;
export const getStatisticData = (state) => state.statisticData.statisticData;
