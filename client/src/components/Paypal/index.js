import axios from "axios";

export const checkoutPaypal = async (cartBuy) => {
	const response = await axios.post("/create-order", cartBuy);
	return response;
};

// export const paymentAcepted = async () => {
// 	const response = await axios.post("/capture-order");
// 	console.log("response.data", response.data);
// };
