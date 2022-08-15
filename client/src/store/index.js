import { configureStore } from '@reduxjs/toolkit';
import productSlice from './slices/products/productSlice';
import userSlice from './slices/users/userSlice';

export const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
  },
});
