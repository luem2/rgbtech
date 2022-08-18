import axios from "axios";
import { getProducts } from "./productSlice";

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
			const products = await axios.get("product?name=" + name );
			dispatch(getProducts(products.data));
		} catch (e) {
			console.error(e);
		}
	};
};


