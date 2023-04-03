import type { Request, Response } from 'express'

import productsServices from '../services/products.service'

class ProductsController {
    async getAllProducts(_req: Request, res: Response) {
        const products = await productsServices.getAllProducts()

        res.status(200).send({
            status: 'Success',
            msg: 'All products have been successfully sent',
            body: {
                products,
                count: products.length,
            },
        })
    }

    async getProduct(req: Request, res: Response) {
        const product = await productsServices.getProduct(req)

        res.status(200).send({
            status: 'Success',
            msg: 'Product have been successfully sent',
            body: product,
        })
    }

    async productUpdate(req: Request, res: Response) {
        const updatedProduct = await productsServices.productUpdate(req)

        res.status(201).send({
            status: 'Success',
            msg: 'Product have been successfully updated',
            body: updatedProduct,
        })
    }
}

export default new ProductsController()
