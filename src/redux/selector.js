import { createSelector } from '@reduxjs/toolkit';

export const getCategory = (state) => state.category.category;
export const getVariantAttribute = (state) => state.variantAttribute.variantAttribute;
export const getProducts = (state) => state.product.products;
