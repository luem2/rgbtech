import axios from "axios";
import { getProducts, getDetailsProductById, searchName } from "./productSlice";

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

export const getAllProducts = (num) => {
	return async (dispatch) => {
		try {
			const products = await axios.get(`products?pageNumber=${num || 1}`);
			dispatch(getProducts(products.data));
		} catch (e) {
			console.error(e);
		}
	};
};

export const getProductByName = (name) => {
	return async (dispatch) => {
		try {
			const products = await axios.get("products?name=" + name);
			dispatch(getProductsName(products.data));
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
