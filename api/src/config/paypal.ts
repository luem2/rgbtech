import type { AxiosResponse } from 'axios'

import axios from 'axios'

import { config } from '.'

export class PaypalApi {
    declare CLIENTID
    declare SECRET

    constructor() {
        this.CLIENTID = config.PAYPAL_API_CLIENTID
        this.SECRET = config.PAYPAL_API_SECRET

        axios.defaults.baseURL = config.PAYPAL_API_URL
        axios.defaults.method = 'post'
    }

    async createOrder() {
        const accessToken = await this.generateAccessToken()

        const response = await axios({
            url: '/v2/checkout/orders',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            data: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        amount: {
                            currency_code: 'USD',
                            value: '100.00',
                        },
                    },
                ],
            }),
        })

        return await this.handleResponse(response)
    }

    async capturePayment(orderId: string) {
        const accessToken = await this.generateAccessToken()

        const response = await axios({
            url: `/v2/checkout/orders/${orderId}/capture`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        })

        return await this.handleResponse(response)
    }

    async generateAccessToken() {
        const auth = Buffer.from(this.CLIENTID + ':' + this.SECRET).toString(
            'base64'
        )

        const response = await axios({
            url: '/v1/oauth2/token',
            headers: {
                Authorization: `Basic ${auth}`,
            },
            data: {
                grant_type: 'client_credentials',
            },
        })

        const jsonData = await this.handleResponse(response)

        return jsonData.access_token as string
    }

    async handleResponse(response: AxiosResponse) {
        if (response.status === 200 || response.status === 201) {
            return response.data
        }

        throw new Error(response.statusText)
    }
}
