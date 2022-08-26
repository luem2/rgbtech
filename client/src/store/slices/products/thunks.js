import axios from "axios";
import {
	getProducts,
	getDetailsProductById,
	searchName,
	getProductsFilters,
} from "./productSlice";

export const searchNameAction = (input) => {
	return async (dispatch) => {
		try {
			const products = await axios.get(`products/search?name=${input}`);
			dispatch(searchName(products.data));
		} catch (error) {
			console.error(e);
		}
	};
};

export const searchTagAction = (input) => {
	return async (dispatch) => {
		try {
			const products = await axios.get(`products?tag=${input}`);
			dispatch(getProductsFilters(products.data));
			console.log(products);
		} catch (error) {
			console.error(e);
		}
	};
};

export const getAllProducts = (num, search) => {
	if (!search) {
		search = "?";
	} else {
		search = search + "&";
		console.log(search, "&");
	}
	return async (dispatch) => {
		try {
			const products = await axios.get(
				`products${search}pageNumber=${num || 1}`
			);
			dispatch(getProducts(products.data));
		} catch (e) {
			console.error(e);
		}
	};
};

export const getProductById = (id) => {
	return async (dispatch) => {
		try {
			const product = await axios.get(`products/${id}`);
			dispatch(getDetailsProductById(product.data));
		} catch (e) {
			console.error(e);
		}
	};
};
