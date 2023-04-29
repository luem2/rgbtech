import { ProductControllers } from '../controllers/products.controllers'
import { ProductMiddlewares } from '../middlewares/products.middlewares'
import { productSchema } from '../schemas/product.schemas'
import { validateSchema, parseRequest } from '../middlewares'
import { BaseRouter } from '../config/bases'
import multer from '../config/multer'

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
            [
                this.middlewares.getProductsAuthMiddleware,
                parseRequest('query'),
                this.middlewares.checkQueryObjectFilters,
            ],
            this.controllers.getAllProducts
        )

        this.router.get(
            '/:id',
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
                multer.single('product'),
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdatePictureProduct,
            ],
            this.controllers.productPictureUpdate
        )

        this.router.post(
            '/',
            [
                multer.single('product'),
                this.auth.checkAdminAuth,
                parseRequest('body'),
                validateSchema(productSchema),
                this.middlewares.checkBrandAndTags,
                this.middlewares.checkBodyAddProduct,
            ],
            this.controllers.addProduct
        )

        this.router.delete(
            '/:id',
            this.auth.checkAdminAuth,
            this.controllers.deleteProduct
        )

        this.router.patch(
            '/:id',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkUpdateProductAvailability,
            ],
            this.controllers.changeProductAvailability
        )
    }
}
