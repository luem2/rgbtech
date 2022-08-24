import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cart: [],
};

const guestShoppingCartSlice = createSlice({
	name: "shoppingCart",
	initialState,
	reducers: {
		addProduct: (state, action) => {
			state.cart.push({ ...action.payload, amount: 1 });
		},

		addUnitToCart: (state, action) => {},

		delUnitFromCart: (state, action) => {},

		delProduct: (state, action) => {
			state.cart.splice(action.payload, 1);
		},

		emptyCart: (state) => {
			state.cart = [];
		},
	},
});

export const { addProduct, emptyCart, delProduct } =
	guestShoppingCartSlice.actions;

export default guestShoppingCartSlice.reducer;
