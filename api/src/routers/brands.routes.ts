import { BrandControllers } from '../controllers/brands.controllers'
import { BrandMiddlewares } from '../middlewares/brands.middlewares'
import { parseBody, validateSchema } from '../middlewares'
import { brandSchema } from '../schemas'
import { multerTemp } from '../config/multer'
import { BaseRouter } from '../config/bases'

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
            this.controllers.getBrand
        )

        this.router.put(
            '/:name',
            [
                multerTemp.single('brand'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(brandSchema),
                this.middlewares.checkBodyEditBrand,
            ],
            this.controllers.brandUpdate
        )

        this.router.post(
            '/',
            [
                multerTemp.single('brand'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(brandSchema),
                this.middlewares.checkBodyAddBrand,
            ],
            this.controllers.addBrand
        )

        this.router.delete(
            '/:name',
            this.auth.checkAdminAuth,
            this.controllers.deleteBrand
        )

        this.router.patch(
            '/:name',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdateBrandAvailability,
            ],
            this.controllers.changeBrandAvailability
        )
    }
}
