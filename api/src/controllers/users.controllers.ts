import type { Request, Response } from 'express'

import authServices from '../services/auth.services'
import { UserServices } from '../services/users.services'
import { BaseControllers } from '../config/bases'

export class UserControllers extends BaseControllers<UserServices> {
    constructor() {
        super(UserServices)
    }

    getAllUsers = async (_req: Request, res: Response) => {
        const allUsers = await this.services.getAllUsers()

        this.httpResponse.Ok(res, {
            users: allUsers,
            count: allUsers.length,
        })
    }

    profileUpdate = async (req: Request, res: Response) => {
        const profileEdited = await this.services.updateProfile(req)

        if (!profileEdited) {
            this.httpResponse.BadRequest(res, 'Country sent is invalid')
        }

        this.httpResponse.Ok(res, {
            msg: 'The profile was successfully updated',
            userUpdated: profileEdited,
        })
    }

    passwordUpdate = async (req: Request, res: Response) => {
        await authServices.passwordUpdate(req)

        this.httpResponse.Ok(res, 'The password was successfully updated')
    }

    changeProfilePhoto = async (req: Request, res: Response) => {
        if (!req.file) {
            this.httpResponse.BadRequest(res, 'The image was not sent')
        }

        const userUpdated = await this.services.changeProfilePhoto(req)

        if (!userUpdated) {
            this.httpResponse.BadRequest(res, 'User not found')
        }

        this.httpResponse.Ok(res, 'The profile photo was successfully updated')
    }

    getShoppingCart = async (req: Request, res: Response) => {
        const user = await this.services.getShoppingCart(req.userId)

        this.httpResponse.Ok(res, {
            msg: 'The user shopping cart was successfully submitted',
            shoppingCart: user?.shoppingCart,
        })
    }

    addItemToCart = async (req: Request, res: Response) => {
        await this.services.addItemToCart(req)

        const product = req.body.productId as string

        this.httpResponse.Created(
            res,
            `The item ${product} has been added to cart`
        )
    }

    modifyItemQuantity = async (req: Request, res: Response) => {
        await this.services.modifyItemQuantity(req)

        this.httpResponse.Ok(res, 'The item quantity has been modified')
    }

    deleteItemFromCart = async (req: Request, res: Response) => {
        const product = req.params.productId

        await this.services.deleteItemFromCart(req)

        this.httpResponse.Ok(
            res,
            `The item ${product} has been deleted from cart`
        )
    }

    cleanShoppingCart = async (req: Request, res: Response) => {
        await this.services.cleanShoppingCart(req.userId)

        this.httpResponse.Ok(res, `The user's shopping cart was cleaned`)
    }

    getFavorites = async (req: Request, res: Response) => {
        const favorites = await this.services.getFavorites(req.userId)

        this.httpResponse.Ok(res, {
            msg: `The user's favorites was successfully submitted`,
            favorites,
        })
    }

    addItemToFavorites = async (req: Request, res: Response) => {
        await this.services.addItemToFavorites(req)

        const product = req.body.productId as string

        this.httpResponse.Created(
            res,
            `The item ${product} has been added to favorites`
        )
    }

    deleteItemFromFavorites = async (req: Request, res: Response) => {
        const product = req.params.productId

        await this.services.deleteItemFromFavorites(req)

        this.httpResponse.Ok(
            res,
            `The item ${product} has been deleted from favorites`
        )
    }

    cleanFavorites = async (req: Request, res: Response) => {
        await this.services.cleanFavorites(req.userId)

        this.httpResponse.Ok(res, `The user's favorites was cleaned`)
    }

    getReviews = async (req: Request, res: Response) => {
        const user = await this.services.getReviews(req.userId)

        this.httpResponse.Ok(res, {
            msg: `The user's reviews was successfully submitted`,
            reviews: user?.reviews,
        })
    }

    addReview = async (req: Request, res: Response) => {
        await this.services.addReview(req)

        this.httpResponse.Created(res, {
            msg: 'The review has been posted',
            reviewAdded: req.body,
        })
    }

    getTransactions = async (req: Request, res: Response) => {
        const user = await this.services.getTransactions(req.userId)

        this.httpResponse.Ok(res, {
            msg: `The user's transactions was successfully submitted`,
            transactions: user?.transactions,
        })
    }

    getHistory = async (req: Request, res: Response) => {
        const user = await this.services.getHistory(req.userId)

        this.httpResponse.Ok(res, {
            msg: `The user's history was successfully submitted`,
            history: user?.history,
        })
    }

    addLastVisitedToHistory = async (req: Request, res: Response) => {
        await this.services.addLastVisitedToHistory(req)

        this.httpResponse.Created(res, {
            msg: 'The last product visited has been added to history',
            productAdded: req.body.productId,
        })
    }

    changeUserAvailability = async (req: Request, res: Response) => {
        const productDisabled = await this.services.changeUserAvailability(req)

        this.httpResponse.Ok(res, {
            msg: 'The user have been successfully updated',
            product: productDisabled,
        })
    }

    claimAward = async (req: Request, res: Response) => {
        await this.services.claimAward(req)

        this.httpResponse.Ok(res, {
            msg: 'Award was successfully claimed',
            awardClaimed: req.body.awardClaimed,
        })
    }
}
