import { AwardControllers } from '../controllers/awards.controllers'
import { AwardMiddlewares } from '../middlewares/awards.middlewares'
import { awardSchema } from '../schemas'
import { parseRequest, validateSchema } from '../middlewares'
import { BaseRouter } from '../config/bases'
import multer from '../config/multer'

export class AwardRouter extends BaseRouter<
    AwardControllers,
    AwardMiddlewares
> {
    constructor() {
        super(AwardControllers, AwardMiddlewares)
        this.routes()
    }

    routes() {
        this.router.get('/', this.controllers.getAllAwards)

        this.router.get(
            '/:id',
            this.middlewares.checkIfAwardExists,
            this.controllers.getAward
        )

        this.router.put(
            '/',
            [
                multer.single('award'),
                this.auth.checkAdminAuth,
                parseRequest('body'),
                validateSchema(awardSchema),
                this.middlewares.checkBodyEditAward,
            ],
            this.controllers.awardUpdate
        )

        this.router.post(
            '/',
            [
                multer.single('award'),
                this.auth.checkAdminAuth,
                parseRequest('body'),
                validateSchema(awardSchema),
                this.middlewares.checkBodyAddAward,
            ],
            this.controllers.addAward
        )

        this.router.delete(
            '/:id',
            [this.auth.checkAdminAuth, this.middlewares.checkIfAwardExists],
            this.controllers.deleteAward
        )
    }
}
