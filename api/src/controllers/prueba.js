const axios = require("axios")
const { PAYPAL_API_ClientID, PAYPAL_API_SECRET, PAYPAL_API_Url } = require("../../config")

module.exports = {
  create: async (req, res) => {
    // ? para varias compras se hacen varios amount
    try {
      const order = {
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "USD",
            value: "105.70"
          },
          description: "teclado"
        },
        {
          amount: {
            currency_code: "USD",
            value: "105.80"
          },
          description: "monitor"
        },
        ],
        application_context: {
          brand_name: "rgbtech",
          landing_page: "LOGIN",
          user_action: "PAY_NOW",
          return_url: "http://localhost:3003/capture-order",
          cancel_url: "http://localhost:3003/cancel-order"
        }
      }
      const params = new URLSearchParams()
      params.append("grant_type", "client_credentials")

      const { data: { access_token } } = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        auth: {
          username: PAYPAL_API_ClientID,
          passworp: PAYPAL_API_SECRET
        }

      })
      const response = await axios.post(`${PAYPAL_API_Url}/v2/checkout/orders`, order, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      res.json(response.data)
    } catch (error) {
      console.log(error, "---e---")
      res.send(error)
    }
  },


  capture: async (req, res) => {

    try {
      const { token, PayerID } = req.query;

      const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
        {},
        {
          auth: {
            username: PAYPAL_API_ClientID,
            password: PAYPAL_API_SECRET,
          },
        }
      );
      res.json(response.data)
    } catch (error) {
      console.log(error, "error")
    }

  },
  cancel: (req, res) => {
    res.send("cancele an order")
  }

}

