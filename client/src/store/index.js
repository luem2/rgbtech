import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/products/productSlice";
import userSlice from "./slices/users/userSlice";
import guestShoppingCartSlice from "./slices/guestShoppingCart/guestShoppingCartSlice";
import componentSlice from "./slices/components/componentSlice";

export const store = configureStore({
	reducer: {
		products: productSlice,
		user: userSlice,
		guestShoppingCart: guestShoppingCartSlice,
		components: componentSlice,
	},
});
