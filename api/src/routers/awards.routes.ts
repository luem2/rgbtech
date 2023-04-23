import { AwardControllers } from '../controllers/awards.controllers'
import { AwardMiddlewares } from '../middlewares/awards.middlewares'
import { awardSchema } from '../schemas'
import { parseBody, validateSchema } from '../middlewares'
import { multerTemp } from '../config/multer'
import { BaseRouter } from '../config/bases'

export class AwardRouter extends BaseRouter<
    AwardControllers,
    AwardMiddlewares
> {
    constructor() {
        super(AwardControllers, AwardMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get(
            '/',
            this.middlewares.getAwardsAuthMiddleware,
            this.controllers.getAllAwards
        )

        this.router.get(
            '/:awardId',
            this.middlewares.getAwardsAuthMiddleware,
            this.controllers.getAward
        )

        this.router.put(
            '/',
            [
                multerTemp.single('award'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(awardSchema),
                this.middlewares.checkBodyEditAward,
            ],
            this.controllers.awardUpdate
        )

        this.router.post(
            '/',
            [
                multerTemp.single('award'),
                this.auth.checkAdminAuth,
                parseBody,
                validateSchema(awardSchema),
                this.middlewares.checkBodyAddAward,
            ],
            this.controllers.addAward
        )

        this.router.delete(
            '/:id',
            this.auth.checkAdminAuth,
            this.controllers.deleteAward
        )
    }
}
