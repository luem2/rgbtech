import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	productDetails: {},
	response: {},
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action) => {
			const {data, nextPage, pageNumbers} = action.payload
			state.products.push(data)
			state.response = { nextPage, pageNumbers }
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
