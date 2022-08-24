import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const guestShoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState,
	reducers: {
		addProduct: (state, product) => {
			state.cart.push(product.payload);
		},
	},
});

export const { addProduct } = guestShoppingCartSlice.actions;

export default guestShoppingCartSlice.reducer;
