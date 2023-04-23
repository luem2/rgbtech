import { TagControllers } from '../controllers/tags.controllers'
import { TagMiddlewares } from '../middlewares/tags.middlewares'
import { BaseRouter } from '../config/bases'

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
            [this.auth.checkAdminAuth, this.middlewares.normalizeTag],
            this.controllers.getTag
        )

        this.router.put(
            '/:name',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkNameTag,
                this.middlewares.normalizeTag,
                this.middlewares.checkBodyEditTag,
            ],
            this.controllers.tagUpdate
        )

        this.router.post(
            '/',
            [
                this.auth.checkAdminAuth,
                this.middlewares.checkNameTag,
                this.middlewares.normalizeTag,
                this.middlewares.checkBodyAddTag,
            ],
            this.controllers.addTag
        )

        this.router.delete(
            '/:name',
            this.auth.checkAdminAuth,
            this.controllers.deleteTag
        )

        this.router.patch(
            '/:name',
            [
                this.auth.checkAdminAuth,
                this.middlewares.normalizeTag,
                this.middlewares.checkUpdateTagAvailability,
            ],
            this.controllers.changeTagAvailability
        )
    }
}
