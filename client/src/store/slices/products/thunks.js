import axios from "axios";
import { getProducts, getDetailsProductById } from "./productSlice";

export const getAllProducts = () => {
	return async (dispatch) => {
		try {
			const products = await axios.get("product");
			dispatch(getProducts(products.data));
		} catch (e) {
			console.error(e);
		}
	};
};

export const getProductByName = (name) => {
	return async (dispatch) => {
		try {
			const products = await axios.get("product?name=" + name);
			dispatch(getProducts(products.data));
		} catch (e) {
			console.error(e);
		}
	};
};

export const getProductById = (id) => {
	return async (dispatch) => {
		try {
			const product = await axios.get(`product/${id}`);
			dispatch(getDetailsProductById(product.data));
		} catch (e) {
			console.error(e);
		}
	};
};
