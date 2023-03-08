import axios from 'axios'
// const paypal = require("../../../client/src/components/Paypal/PaymentAcepted")
import { config } from '../config/env'

export async function create(req, res) {
    console.log('req.body', req.body)
    try {
        const order = {
            intent: 'CAPTURE',
            purchase_units: req.body,
            application_context: {
                brand_name: 'RGBTech',
                locale: 'en-US',
                landing_page: 'NO_PREFERENCE', // LOGIN
                user_action: 'PAY_NOW',
                return_url: 'http://localhost:3003/capture-order',
                cancel_url: 'http://localhost:3003/cancel-order',
            },
        }

        const params = new URLSearchParams()
        params.append('grant_type', 'client_credentials')

        const {
            data: { access_token },
        } = await axios.post(
            'https://api-m.sandbox.paypal.com/v1/oauth2/token',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                auth: {
                    username: config.PAYPAL_API_CLIENTID,
                    password: config.PAYPAL_API_SECRET,
                },
            }
        )

        const response = await axios.post(
            `${config.PAYPAL_API_URL}/v2/checkout/orders`,
            order,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        )

        // console.log("response", response);
        res.json(response.data.links[1].href)
    } catch (error) {
        console.log(error, '---e---')
        res.send(error)
    }
}

export async function capture(req, res) {
    try {
        const { token, PayerID } = req.query

        const response = await axios.post(
            `https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`,
            {},
            {
                auth: {
                    username: config.PAYPAL_API_CLIENTID,
                    password: config.PAYPAL_API_SECRET,
                },
            }
        )
        console.log('response.data', response.data)
        res.redirect('http://localhost:5173/order-successfully')
        // res.json(response.data)
    } catch (error) {
        console.log(error, 'error')
    }
}

export function cancel(req, res) {
    res.redirect('http://localhost:5173/order-canceled')
}
