import type { Request, Response } from 'express'

import productsServices from '../services/products.service'

class ProductsControllers {
    async getAllProducts(req: Request, res: Response) {
        let products

        if (Object.keys(req.query).length) {
            products = await productsServices.getQueryProducts(req)
        } else {
            products = await productsServices.getAllProducts(req.userRole)
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
        const updatedProduct = await productsServices.productUpdate(req.body)

        res.status(200).send({
            status: 'Success',
            msg: 'Product have been successfully updated',
            body: updatedProduct,
        })
    }

    async productPictureUpdate(req: Request, res: Response) {
        if (!req.file)
            return res.status(401).send({
                status: 'Error',
                msg: 'The new product image is needed',
            })

        const updatedProduct = await productsServices.productPictureUpdate(req)

        if (!updatedProduct)
            return res.status(401).send({
                status: 'Error',
                msg: 'Product not found',
            })

        res.status(200).send({
            status: 'Success',
            msg: 'Product picture have been successfully updated',
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
            msg: 'Product have been successfully updated',
            body: productDisabled,
        })
    }

    async deleteProduct(req: Request, res: Response) {
        const deletedProduct = await productsServices.deleteProduct(req)

        if (!deletedProduct)
            return res.status(404).send({
                status: 'Error',
                msg: 'Product not found',
            })

        res.status(200).send({
            status: 'Success',
            msg: 'Product have been successfully deleted',
            body: deletedProduct,
        })
    }
}

export default new ProductsControllers()
