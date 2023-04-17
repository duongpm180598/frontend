import { createSelector } from '@reduxjs/toolkit';

export const getCategory = (state) => state.category.category;
export const getVariantAttribute = (state) => state.variantAttribute.variantAttribute;
export const getProducts = (state) => state.product.products;
export const getCart = (state) => state.cart.cart;
export const getTotalQuantity = (state) => state.cart.totalQuantity;
export const getProvinces = (state) => state.GHN.provinces;
export const getDistricts = (state) => state.GHN.districts;
export const getWards = (state) => state.GHN.wards;
