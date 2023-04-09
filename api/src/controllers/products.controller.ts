import type { Request, Response } from 'express'

import productsServices from '../services/products.service'

class ProductsControllers {
    async getAllProducts(req: Request, res: Response) {
        let products

        if (Object.keys(req.query).length) {
            products = await productsServices.getQueryProducts(req)
        } else {
            products = await productsServices.getAllProducts(req)
        }

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

        if (!product)
            return res.status(404).send({
                status: 'Error',
                msg: 'Product not found',
            })

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

    async addProduct(req: Request, res: Response) {
        const newProduct = await productsServices.addProduct(req)

        res.status(201).send({
            status: 'Success',
            msg: 'Product have been successfully created',
            body: newProduct,
        })
    }

    async changeProductAvailability(req: Request, res: Response) {
        const productDisabled =
            await productsServices.changeProductAvailability(req)

        res.status(201).send({
            status: 'Success',
            msg: 'Product have been successfully disabled',
            body: productDisabled,
        })
    }
}

export default new ProductsControllers()
