import type { NextFunction, Request, Response } from 'express'

import { AuthServices } from '../services/auth.services'
import { UserServices } from '../services/users.services'
import { BaseControllers } from '../config/bases'

export class UserControllers extends BaseControllers<UserServices> {
    declare auth: AuthServices

    constructor() {
        super(UserServices)
        this.auth = new AuthServices()
    }

    getAllUsers = async (_req: Request, res: Response) => {
        const allUsers = await this.services.getAllUsers()

        this.httpResponse.Ok(res, {
            msg: 'Users were correctly sent',
            count: allUsers.length,
            users: allUsers,
        })
    }

    profileUpdate = async (req: Request, res: Response) => {
        const profileEdited = await this.services.updateProfile(req)

        this.httpResponse.Ok(res, {
            msg: 'The profile was successfully updated',
            userUpdated: profileEdited,
        })
    }

    passwordUpdate = async (req: Request, res: Response) => {
        await this.auth.passwordUpdate(req)

        this.httpResponse.Ok(res, 'The password was successfully updated')
    }

    changeProfilePhoto = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            await this.services.changeProfilePhoto(req)

            this.httpResponse.Ok(
                res,
                'The profile photo was successfully updated'
            )
        } catch (error) {
            next(error)
        }
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

        this.httpResponse.Created(
            res,
            `The item product has been added to cart`
        )
    }

    modifyItemQuantity = async (req: Request, res: Response) => {
        await this.services.modifyItemQuantity(req)

        this.httpResponse.Ok(res, 'The item quantity has been modified')
    }

    deleteItemFromCart = async (req: Request, res: Response) => {
        await this.services.deleteItemFromCart(req)

        this.httpResponse.Ok(res, 'The product has been deleted from cart')
    }

    cleanShoppingCart = async (req: Request, res: Response) => {
        await this.services.cleanShoppingCart(req.userId)

        this.httpResponse.Ok(res, `The user's shopping cart was cleaned`)
    }

    getFavorites = async (req: Request, res: Response) => {
        const user = await this.services.getFavorites(req.userId)

        this.httpResponse.Ok(res, {
            msg: `The user's favorites was successfully submitted`,
            favorites: user?.favorites,
        })
    }

    addItemToFavorites = async (req: Request, res: Response) => {
        await this.services.addItemToFavorites(req)

        this.httpResponse.Created(
            res,
            `The item product has been added to favorites`
        )
    }

    deleteItemFromFavorites = async (req: Request, res: Response) => {
        await this.services.deleteItemFromFavorites(req)

        this.httpResponse.Ok(res, 'The product has been deleted from favorites')
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
            review: req.body,
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

    changeUserAvailability = async (req: Request, res: Response) => {
        const userUpdated = await this.services.changeUserAvailability(req.body)

        this.httpResponse.Ok(res, {
            msg: 'The user have been successfully updated',
            user: userUpdated,
        })
    }

    claimAward = async (req: Request, res: Response) => {
        await this.services.claimAward(req)

        this.httpResponse.Ok(res, {
            msg: 'Award was successfully claimed',
            award: req.body.award,
        })
    }

    cleanHistory = async (req: Request, res: Response) => {
        await this.services.cleanHistory(req.userId)

        this.httpResponse.Ok(res, `The user's history was cleaned`)
    }
}
