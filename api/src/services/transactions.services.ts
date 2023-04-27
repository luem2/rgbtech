import type { Request } from 'express'

import { db } from '../database'
import { PaypalApi } from '../helpers/paypal'

export class TransactionServices {
    declare paypal

    constructor() {
        this.paypal = new PaypalApi()
    }

    async getAllTransactions() {
        return await db.transactions.findMany({
            include: {
                _count: true,
                order: true,
            },
        })
    }

    async getTransactionsByUser({ id }: Request['params']) {
        return await db.user.findUnique({
            where: {
                id,
            },
            select: {
                transactions: true,
            },
        })
    }

    async createOrder({ userId, body }: Request) {
        return await db.transactions.create({
            data: {
                userId,
                status: 'Pending',
                order: {
                    createMany: {
                        data: body,
                    },
                },
            },
            include: {
                order: true,
            },
        })
    }

    async completeTransaction({ userId, body }: Request) {
        // await db.user.update({
        //     where: {
        //         id: userId,
        //     },
        //     data: {
        //         shoppingCart: {
        //             deleteMany: {},
        //         },
        //     },
        // })
        // return await db.transactions.create({})
    }

    async cancelTransaction({ userId, body }: Request) {
        // return algo XD
    }

    // router.post('/new-sale', async (req, res) => {
    //     try {
    //         const { userId, products } = req.body

    //         products.map(async (product) => {
    //             const { productId, name, productPrice, month, year, amount } =
    //                 product

    //             console.log('products', products)
    //             const productDetails = await Product.findByPk(productId, {
    //                 include: {
    //                     model: Tag,
    //                     through: { attributes: [] },
    //                 },
    //             })
    //             console.log('productDetails', productDetails)
    //             const { brandId, tags } = productDetails.dataValues
    //             const tagsId = []
    //             tags.map((t) => tagsId.push(t.dataValues.id))
    //             const newSale = await Sale.create({
    //                 productId,
    //                 name,
    //                 productPrice,
    //                 month,
    //                 year,
    //                 amount,
    //                 totalPrice: productPrice * amount,
    //             })

    //             const user = await User.findAll({
    //                 where: {
    //                     id: userId,
    //                 },
    //             })

    //             const info = {
    //                 nombre: user[0].dataValues.user,
    //                 products: {
    //                     mail: user[0].dataValues.mail,
    //                     name: name,
    //                     totalPrice: newSale.dataValues.totalPrice,
    //                     month: month,
    //                 },
    //             }
    //             sendConfirmationBuyEmail(info)
    //             await newSale.addTags(tagsId)
    //             await newSale.setBrand(brandId)
    //             await newSale.setUser(userId)

    //             const stockProduct = await Product.findByPk(productId)
    //             const updatedStock = stockProduct.stock - amount
    //             await Product.update(
    //                 {
    //                     stock: updatedStock,
    //                 },
    //                 {
    //                     where: { id: productId },
    //                 }
    //             )
    //         })
    //         res.send('producto comprado')
    //     } catch (error) {
    //         console.log(error)
    //     }
    // })

    // router.put('/comments', async (req, res) => {
    //     try {
    //         const { id, post } = req.body
    //         const { comment, rating, user, profilePhoto } = post
    //         const sale = await Sale.findByPk(id)
    //         const productId = sale.dataValues.productId
    //         const newComment = await Comment.create({
    //             comment,
    //             rating,
    //             user,
    //             profilePhoto,
    //         })
    //         await newComment.addProduct(productId)
    //         await Sale.update(
    //             {
    //                 commented: true,
    //             },
    //             {
    //                 where: {
    //                     id: id,
    //                 },
    //             }
    //         )
    //     } catch (error) {
    //         res.sendStatus(500)
    //     }
    // })

    // export default router

    // import type { Request, Response } from 'express'

    // import axios from 'axios'

    // import { config } from '../config'

    // export async function create(req: Request, res: Response) {
    //     console.log('req.body', req.body)

    //     try {
    //         const order = {
    //             intent: 'CAPTURE',
    //             purchase_units: req.body,
    //             application_context: {
    //                 brand_name: 'RGBTech',
    //                 locale: 'en-US',
    //                 landing_page: 'NO_PREFERENCE', // LOGIN
    //                 user_action: 'PAY_NOW',
    //                 return_url: 'http://localhost:3003/capture-order',
    //                 cancel_url: 'http://localhost:3003/cancel-order',
    //             },
    //         }

    //         const params = new URLSearchParams()

    //         params.append('grant_type', 'client_credentials')

    //         const {
    //             data: { access_token },
    //         } = await axios.post(
    //             'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    //             params,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/x-www-form-urlencoded',
    //                 },
    //                 auth: {
    //                     username: config.PAYPAL_API_CLIENTID,
    //                     password: config.PAYPAL_API_SECRET,
    //                 },
    //             }
    //         )

    //         console.log('access_token', access_token)

    //         const response = await axios.post(
    //             `${config.PAYPAL_API_URL}/v2/checkout/orders`,
    //             order,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${access_token as string}`,
    //                 },
    //             }
    //         )

    //         res.json(response.data.links[1].href)
    //     } catch (error) {
    //         console.error(error)
    //         res.send(error)
    //     }
    // }

    // export async function capture(req: Request, res: Response) {
    //     try {
    //         const { token } = req.query

    //         const response = await axios.post(
    //             `https://api-m.sandbox.paypal.com/v2/checkout/orders/${
    //                 token as string
    //             }/capture`,
    //             {},
    //             {
    //                 auth: {
    //                     username: config.PAYPAL_API_CLIENTID,
    //                     password: config.PAYPAL_API_SECRET,
    //                 },
    //             }
    //         )
    //         console.log('response.data', response.data)

    //         res.redirect('http://localhost:5173/order-successfully')
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    // export function cancel(_req: Request, res: Response) {
    //     res.redirect('http://localhost:5173/order-canceled')
    // }
}
