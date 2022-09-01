const axios = require("axios");
const {
	PAYPAL_API_ClientID,
	PAYPAL_API_SECRET,
	PAYPAL_API_URL,
} = require("../../config");

module.exports = {
	create: async (req, res) => {
		console.log("req.body", req.body);
		try {
			const order = {
				intent: "CAPTURE",
				purchase_units: req.body,
				application_context: {
					brand_name: "RGBTech",
					locale: "en-US",
					landing_page: "NO_PREFERENCE", //LOGIN
					user_action: "PAY_NOW",
					return_url: "http://127.0.0.1:5173/order-successfully",
					cancel_url: "http://127.0.0.1:5173/",
				},
			};

			const params = new URLSearchParams();
			params.append("grant_type", "client_credentials");

			const {
				data: { access_token },
			} = await axios.post(
				"https://api-m.sandbox.paypal.com/v1/oauth2/token",
				params,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
					},
					auth: {
						username: PAYPAL_API_ClientID,
						password: PAYPAL_API_SECRET,
					},
				}
			);

			const response = await axios.post(
				`${PAYPAL_API_URL}/v2/checkout/orders`,
				order,
				{
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				}
			);

			// console.log("response", response);
			res.json(response.data.links[1].href);
		} catch (error) {
			console.log(error, "---e---");
			res.send(error);
		}
	},

	capture: async (req, res) => {
		try {
			const { token, PayerID } = req.query;

			const response = await axios.post(
				`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
				{},
				{
					auth: {
						username: PAYPAL_API_ClientID,
						password: PAYPAL_API_SECRET,
					},
				}
			);
			console.log("response.data", response.data);
			res.json(response.data);
		} catch (error) {
			console.log(error, "error");
		}
	},
	cancel: (req, res) => {
		res.send("cancele an order");
	},
};
