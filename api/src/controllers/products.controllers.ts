import type { Request, Response } from 'express'

import { ProductServices } from '../services/products.services'
import { BaseControllers } from '../config/bases'

export class ProductControllers extends BaseControllers<ProductServices> {
    constructor() {
        super(ProductServices)
    }

    getAllProducts = async (req: Request, res: Response) => {
        let products

        if (Object.keys(req.query).length) {
            products = await this.services.getQueryProducts(req)
        } else {
            products = await this.services.getAllProducts(req.userRole)
        }

        this.httpResponse.Ok(res, {
            msg: 'All products have been successfully sent',
            products_count: products.length,
            products,
        })
    }

    getProduct = async (req: Request, res: Response) => {
        const product = await this.services.getProduct(req)

        if (!product) {
            this.httpResponse.NotFound(res, 'Product not found')
        }

        this.httpResponse.Ok(res, {
            msg: 'Product have been successfully sent',
            product,
        })
    }

    productUpdate = async (req: Request, res: Response) => {
        const updatedProduct = await this.services.productUpdate(req.body)

        this.httpResponse.Ok(res, {
            msg: 'Product have been successfully updated',
            product: updatedProduct,
        })
    }

    productPictureUpdate = async (req: Request, res: Response) => {
        if (!req.file) {
            this.httpResponse.BadRequest(res, 'The new product image is needed')
        }

        const updatedProduct = await this.services.productPictureUpdate(req)

        if (!updatedProduct) {
            this.httpResponse.NotFound(res, 'Product not found')
        }

        this.httpResponse.Ok(res, {
            msg: 'Product picture have been successfully updated',
            product: updatedProduct,
        })
    }

    addProduct = async (req: Request, res: Response) => {
        const newProduct = await this.services.addProduct(req.body)

        this.httpResponse.Created(res, {
            msg: 'Product have been successfully created',
            product: newProduct,
        })
    }

    changeProductAvailability = async (req: Request, res: Response) => {
        const productUpdated = await this.services.changeProductAvailability(
            req
        )

        this.httpResponse.Ok(res, {
            msg: 'Product availability have been successfully updated',
            product: productUpdated,
        })
    }

    deleteProduct = async (req: Request, res: Response) => {
        const deletedProduct = await this.services.deleteProduct(req)

        if (!deletedProduct) {
            this.httpResponse.NotFound(res, 'Product not found')
        }

        this.httpResponse.Ok(res, {
            msg: 'Product have been successfully deleted',
            product: deletedProduct,
        })
    }
}
