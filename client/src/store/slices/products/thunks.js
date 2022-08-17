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
