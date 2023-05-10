import { TagControllers } from '../controllers/tags.controllers'
import { TagMiddlewares } from '../middlewares/tags.middlewares'
import { BaseRouter } from '../config/bases'
import { parseRequest } from '../middlewares'

export class TagRouter extends BaseRouter<TagControllers, TagMiddlewares> {
    constructor() {
        super(TagControllers, TagMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.auth.checkAdminAuth,
            this.controllers.getAllTags
        )

        this.router.get(
            '/:name',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfTagExists,
            this.controllers.getTag
        )

        this.router.post(
            '/',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfTagAlreadyExists,
                this.middlewares.checkBodyTag,
            ],
            this.controllers.addTag
        )

        this.router.put(
            '/:name',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfTagExists,
                this.middlewares.checkIfTagAlreadyExists,
            ],
            this.controllers.tagUpdate
        )

        this.router.delete(
            '/:name',
            this.auth.checkAdminAuth,
            this.middlewares.checkIfTagExists,
            this.controllers.deleteTag
        )

        this.router.patch(
            '/:name',
            this.auth.checkAdminAuth,
            [
                parseRequest('body'),
                this.middlewares.checkIfTagExists,
                this.middlewares.checkTypeOfDisabledProp,
            ],
            this.controllers.changeTagAvailability
        )
    }
}
