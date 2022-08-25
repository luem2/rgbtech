import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	filters: [],
	productDetails: {},
	response: {},
	productsName: [],
	productosFilt:[],
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action) => {
			const {data, nextPage, pageNumbers} = action.payload
			state.products.push(...data)
			console.log(data);
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
		searchName: (state, action) => {
			state.productsName = action.payload
		},
		getFilt: (state, action) => {
			state.productosFilt = action.payload
		},
		getProductsFilters: (state, action) => {
			state.filters = action.payload.data;
		},
	},
});

export const { getProducts, getDetailsProductById, clearDetails, searchName, getProductsFilters,getFilt} =
	productSlice.actions;

export default productSlice.reducer;
