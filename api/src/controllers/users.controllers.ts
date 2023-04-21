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
            return res.status(401).send({
                status: 'Error',
                msg: 'Country sent is invalid',
                body: profileEdited,
            })
        }

        res.status(200).send({
            status: 'Success',
            msg: 'The profile was successfully updated',
            body: profileEdited,
        })
    }

    passwordUpdate = async (req: Request, res: Response) => {
        const userWithPasswordUpdated = await authServices.passwordUpdate(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The password was successfully updated',
            body: userWithPasswordUpdated,
        })
    }

    changeProfilePhoto = async (req: Request, res: Response) => {
        if (!req.file)
            return res.status(401).send({
                status: 'Error',
                msg: 'You have not sent the image',
            })

        const userUpdated = await this.services.changeProfilePhoto(req)

        if (!userUpdated)
            return res.status(401).send({
                status: 'Error',
                msg: 'User not found',
            })

        res.status(200).send({
            status: 'Success',
            msg: 'The profile photo was successfully updated',
        })
    }

    getShoppingCart = async (req: Request, res: Response) => {
        const user = await this.services.getShoppingCart(req.userId)

        this.httpResponse.Ok(res, user?.shoppingCart)

        // res.status(200).send({
        //     status: 'Success',
        //     msg: `The user's shopping cart was successfully submitted`,
        //     body: user?.shoppingCart,
        // })
    }

    addItemToCart = async (req: Request, res: Response) => {
        await this.services.addItemToCart(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to cart`,
        })
    }

    modifyItemQuantity = async (req: Request, res: Response) => {
        await this.services.modifyItemQuantity(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The item quantity has been modified',
        })
    }

    deleteItemFromCart = async (req: Request, res: Response) => {
        const product = req.params.productId

        await this.services.deleteItemFromCart(req)

        res.status(200).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from cart`,
        })
    }

    cleanShoppingCart = async (req: Request, res: Response) => {
        await this.services.cleanShoppingCart(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's shopping cart was cleaned`,
        })
    }

    getFavorites = async (req: Request, res: Response) => {
        const favorites = await this.services.getFavorites(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's favorites was successfully submitted`,
            body: favorites,
        })
    }

    addItemToFavorites = async (req: Request, res: Response) => {
        await this.services.addItemToFavorites(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to favorites`,
        })
    }

    deleteItemFromFavorites = async (req: Request, res: Response) => {
        const product = req.params.productId

        await this.services.deleteItemFromFavorites(req)

        res.status(200).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from favorites`,
        })
    }

    cleanFavorites = async (req: Request, res: Response) => {
        await this.services.cleanFavorites(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's favorites was cleaned`,
        })
    }

    getReviews = async (req: Request, res: Response) => {
        const user = await this.services.getReviews(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's reviews was successfully submitted`,
            body: user?.reviews,
        })
    }

    addReview = async (req: Request, res: Response) => {
        await this.services.addReview(req)

        res.status(201).send({
            status: 'Success',
            msg: `The review has been posted`,
        })
    }

    getTransactions = async (req: Request, res: Response) => {
        const user = await this.services.getTransactions(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's transactions was successfully submitted`,
            body: user?.transactions,
        })
    }

    getHistory = async (req: Request, res: Response) => {
        const user = await this.services.getHistory(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's history was successfully submitted`,
            body: user?.history,
        })
    }

    addLastVisitedToHistory = async (req: Request, res: Response) => {
        await this.services.addLastVisitedToHistory(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The last product visited has been added to history',
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

        this.httpResponse.Ok(res, 'Award was successfully claimed')
    }
}
