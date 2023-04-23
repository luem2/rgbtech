import { ProductControllers } from '../controllers/products.controllers'
import { ProductMiddlewares } from '../middlewares/products.middlewares'
import { productSchema } from '../schemas/product.schemas'
import { validateSchema, parseBody } from '../middlewares'
import { multerCore, multerTemp } from '../config/multer'
import { BaseRouter } from '../config/bases'

export class ProductRouter extends BaseRouter<
    ProductControllers,
    ProductMiddlewares
> {
    constructor() {
        super(ProductControllers, ProductMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.middlewares.getProductsAuthMiddleware,
            this.middlewares.checkQueryObjectFilters,
            this.controllers.getAllProducts
        )

        this.router.get(
            '/:productId',
            this.middlewares.getProductsAuthMiddleware,
            this.controllers.getProduct
        )

        this.router.put(
            '/',
            [
                this.auth.checkAdminAuth,
                validateSchema(productSchema),
                this.middlewares.checkBrandAndTags,
                this.middlewares.checkBodyEditProduct,
            ],
            this.controllers.productUpdate
        )

        this.router.put(
            '/picture',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdatePictureProduct,
                multerCore.single('product'),
            ],
            this.controllers.productPictureUpdate
        )

        this.router.post(
            '/',
            [
                multerTemp.single('product'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(productSchema),
                this.middlewares.checkBrandAndTags,
                this.middlewares.checkBodyAddProduct,
            ],
            this.controllers.addProduct
        )

        this.router.delete(
            '/:productId',
            this.auth.checkAdminAuth,
            this.controllers.deleteProduct
        )

        this.router.patch(
            '/:productId',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdateProductAvailability,
            ],
            this.controllers.changeProductAvailability
        )
    }
}
