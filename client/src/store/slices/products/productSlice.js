import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	products: [],
	filters: [],
	productDetails: {},
	response: {},
	productsName: [],
	productosFilt: [],
	tags: [],
	brands: [],
	favorito: [],
};

const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		getProducts: (state, action) => {
			const { data, nextPage, pageNumbers } = action.payload;
			state.products.push(...data);
			state.response = { nextPage, pageNumbers };
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
			state.productsName = action.payload;
		},

		getFilt: (state, action) => {
			state.productosFilt = action.payload;
		},

		getProductsFilters: (state, action) => {
			state.filters = action.payload.data;
		},

		getBrands: (state, action) => {
			state.brands = action.payload;
		},

		getTags: (state, action) => {
			state.tags = action.payload;
		},

		limpiarFiltros: (state) => {
			state.products = [];
			state.response = {};
		},

		addProductsFav: (state, action) => {
			state.favorito.push({
				...action.payload,
			});
		},

		deleteProductFav: (state, action) => {
			state.favorito.splice(action.payload, 1);
		},

		setFavorite: (state, action) => {
			state.favorito = action.payload;
		},

		clearFavorite: (state) => {
			state.favorito = [];
		},
	},
});

export const {
	getProducts,
	getDetailsProductById,
	clearDetails,
	searchName,
	getProductsFilters,
	getFilt,
	getBrands,
	getTags,
	limpiarFiltros,
	deleteProductFav,
	addProductsFav,
	setFavorite,
	clearFavorite,
} = productSlice.actions;

export default productSlice.reducer;
