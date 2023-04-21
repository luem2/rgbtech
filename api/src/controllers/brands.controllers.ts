import type { Request, Response } from 'express'

import brandsServices from '../services/brands.services'

class BrandsControllers {
    async getAllBrands(_req: Request, res: Response) {
        const brands = await brandsServices.getAllBrands()

        res.status(200).send({
            status: 'Success',
            msg: 'All brands have been successfully sent',
            body: {
                brands,
                count: brands.length,
            },
        })
    }

    async getBrand(req: Request, res: Response) {
        const brand = await brandsServices.getBrand(req.params)

        if (brand) {
            res.status(200).send({
                status: 'Success',
                msg: 'The brand has been successfully sent',
                body: brand,
            })
        } else {
            res.status(404).send({
                status: 'Error',
                msg: 'The brand has not been found',
                body: brand,
            })
        }
    }

    async brandUpdate(req: Request, res: Response) {
        const updatedBrand = await brandsServices.brandUpdate(req)

        res.status(200).send({
            status: 'Success',
            msg: 'Brand have been successfully updated',
            body: updatedBrand,
        })
    }

    async addBrand(req: Request, res: Response) {
        const newProduct = await brandsServices.addBrand(req)

        res.status(201).send({
            status: 'Success',
            msg: 'Brand have been successfully created',
            body: newProduct,
        })
    }

    async changeBrandAvailability(req: Request, res: Response) {
        const productDisabled = await brandsServices.changeBrandAvailability(
            req
        )

        res.status(200).send({
            status: 'Success',
            msg: 'Brand have been successfully updated',
            body: productDisabled,
        })
    }

    async deleteBrand(req: Request, res: Response) {
        const deletedBrand = await brandsServices.deleteBrand(req.params)

        if (!deletedBrand)
            return res.status(404).send({
                status: 'Error',
                msg: 'Brand have not been found',
                body: deletedBrand,
            })

        res.status(200).send({
            status: 'Success',
            msg: 'Brand have been successfully deleted',
            body: deletedBrand,
        })
    }
}

export default new BrandsControllers()
