import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productDetails: {},
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action) => {
			state.products = action.payload.data;
		},
		getProductsName: (state, action) => {
			state.products = action.payload.data;
		},
		getDetailsProductById: (state, action) => {
			state.productDetails = action.payload;
		},
		clearDetails: (state) => {
			state.productDetails = {};
		},
	},
});

export const { getProducts, getDetailsProductById, clearDetails } =
	productSlice.actions;

export default productSlice.reducer;
