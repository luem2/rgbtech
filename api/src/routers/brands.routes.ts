import { BrandControllers } from '../controllers/brands.controllers'
import { BrandMiddlewares } from '../middlewares/brands.middlewares'
import { parseRequest, validateSchema } from '../middlewares'
import { brandSchema } from '../schemas'
import { BaseRouter } from '../config/bases'
import multer from '../config/multer'

export class BrandRouter extends BaseRouter<
    BrandControllers,
    BrandMiddlewares
> {
    constructor() {
        super(BrandControllers, BrandMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.auth.checkAdminAuth,
            this.controllers.getAllBrands
        )

        this.router.get(
            '/:name',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfBrandExists,
            this.controllers.getBrand
        )

        this.router.put(
            '/:name',
            this.auth.checkAdminAuth,
            [
                multer.single('brand'),
                parseRequest('body'),
                validateSchema(brandSchema),
                this.middlewares.checkIfBrandExists,
                this.middlewares.checkBodyEditBrand,
            ],
            this.controllers.brandUpdate
        )

        this.router.post(
            '/',
            this.auth.checkAdminAuth,
            [
                multer.single('brand'),
                parseRequest('body'),
                validateSchema(brandSchema),
                this.middlewares.checkBodyAddBrand,
            ],
            this.controllers.addBrand
        )

        this.router.delete(
            '/:name',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfBrandExists,
            this.controllers.deleteBrand
        )

        this.router.patch(
            '/:name',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.checkUpdateBrandAvailability,
            ],
            this.controllers.changeBrandAvailability
        )
    }
}
