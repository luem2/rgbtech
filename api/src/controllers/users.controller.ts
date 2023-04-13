import type { Request, Response } from 'express'

import authServices from '../services/auth.service'
import usersServices from '../services/users.service'

class UsersControllers {
    async getAllUsers(_req: Request, res: Response) {
        const allUsers = await usersServices.getAllUsers()

        res.status(200).send({
            status: 'Success',
            msg: 'All users were sent correctly',
            body: {
                users: allUsers,
                count: allUsers.length,
            },
        })
    }

    async profileUpdate(req: Request, res: Response) {
        const profileEdited = await usersServices.updateProfile(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile was successfully updated',
            body: profileEdited,
        })
    }

    async passwordUpdate(req: Request, res: Response) {
        const userWithPasswordUpdated = await authServices.passwordUpdate(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The password was successfully updated',
            body: userWithPasswordUpdated,
        })
    }

    async changeProfilePhoto(req: Request, res: Response) {
        await usersServices.changeProfilePhoto(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile photo was successfully updated',
        })
    }

    async getShoppingCart(req: Request, res: Response) {
        const user = await usersServices.getShoppingCart(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's shopping cart was successfully submitted`,
            body: user?.shoppingCart,
        })
    }

    async addItemToCart(req: Request, res: Response) {
        await usersServices.addItemToCart(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to cart`,
        })
    }

    async modifyItemQuantity(req: Request, res: Response) {
        await usersServices.modifyItemQuantity(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The item quantity has been modified',
        })
    }

    async deleteItemFromCart(req: Request, res: Response) {
        const product = req.params.productId

        await usersServices.deleteItemFromCart(req)

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from cart`,
        })
    }

    async cleanShoppingCart(req: Request, res: Response) {
        await usersServices.cleanShoppingCart(req.userId)

        res.status(201).send({
            status: 'Success',
            msg: `The user's shopping cart was cleaned`,
        })
    }

    async getFavorites(req: Request, res: Response) {
        const favorites = await usersServices.getFavorites(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's favorites was successfully submitted`,
            body: favorites,
        })
    }

    async addItemToFavorites(req: Request, res: Response) {
        await usersServices.addItemToFavorites(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to favorites`,
        })
    }

    async deleteItemFromFavorites(req: Request, res: Response) {
        const product = req.params.productId

        await usersServices.deleteItemFromFavorites(req)

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from favorites`,
        })
    }

    async cleanFavorites(req: Request, res: Response) {
        await usersServices.cleanFavorites(req.userId)

        res.status(201).send({
            status: 'Success',
            msg: `The user's favorites was cleaned`,
        })
    }

    async getReviews(req: Request, res: Response) {
        const user = await usersServices.getReviews(req.userId)

        res.status(201).send({
            status: 'Success',
            msg: `The user's reviews was successfully submitted`,
            body: user?.reviews,
        })
    }

    async addReview(req: Request, res: Response) {
        await usersServices.addReview(req)

        res.status(201).send({
            status: 'Success',
            msg: `The review has been posted`,
        })
    }

    async getTransactions(req: Request, res: Response) {
        const user = await usersServices.getTransactions(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's transactions was successfully submitted`,
            body: user?.transactions,
        })
    }

    async getHistory(req: Request, res: Response) {
        const user = await usersServices.getHistory(req.userId)

        res.status(200).send({
            status: 'Success',
            msg: `The user's history was successfully submitted`,
            body: user?.history,
        })
    }

    async addLastVisitedToHistory(req: Request, res: Response) {
        await usersServices.addLastVisitedToHistory(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The last product visited has been added to history',
        })
    }

    async changeUserAvailability(req: Request, res: Response) {
        const productDisabled = await usersServices.changeUserAvailability(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The user have been successfully disabled',
            body: productDisabled,
        })
    }
}
export default new UsersControllers()
