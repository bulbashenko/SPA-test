'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  liked: boolean;
}

interface ProductsState {
  data: Product[];
}

const initialState: ProductsState = {
  data: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.data = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const prodId = action.payload;
      const found = state.data.find((p) => p.id === prodId);
      if (found) {
        found.liked = !found.liked;
      }
    },
    deleteProduct(state, action: PayloadAction<string>) {
      state.data = state.data.filter((p) => p.id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.data.push(action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const idx = state.data.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) {
        state.data[idx] = action.payload;
      }
    },
  },
});

export const {
  setProducts,
  toggleLike,
  deleteProduct,
  addProduct,
  updateProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
