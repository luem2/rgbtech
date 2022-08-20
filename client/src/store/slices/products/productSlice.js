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
			state.productDetails = action.payload.data;
		},
	},
});

export const { getProducts, getDetailsProductById } = productSlice.actions;

export default productSlice.reducer;
