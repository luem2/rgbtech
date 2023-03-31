import type { Request, Response } from 'express'

import authServices from '../services/auth.service'
import usersServices from '../services/users.service'

class UsersController {
    async getAllUsers(_req: Request, res: Response): Promise<void> {
        const allUsers = await usersServices.getAllUsers()

        res.status(200).send({
            status: 'Success',
            msg: 'All users were sent correctly',
            body: allUsers,
        })
    }

    async updateProfile(req: Request, res: Response): Promise<void> {
        const profileEdited = await usersServices.updateProfile(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile was successfully updated',
            body: profileEdited,
        })
    }

    async updatePassword(req: Request, res: Response): Promise<void> {
        const userWithPasswordUpdated = await authServices.passwordUpdate(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The password was successfully updated',
            body: userWithPasswordUpdated,
        })
    }

    async changeProfilePhoto(req: Request, res: Response): Promise<void> {
        await usersServices.changeProfilePhoto(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The profile photo was successfully updated',
        })
    }

    async getShoppingCart(req: Request, res: Response): Promise<void> {
        const user = await usersServices.getShoppingCart(req)

        res.status(200).send({
            status: 'Success',
            msg: `The user's shopping cart was successfully submitted`,
            body: user?.shoppingCart,
        })
    }

    async addItemToCart(req: Request, res: Response): Promise<void> {
        await usersServices.addItemToCart(req)

        const product = req.body.productId as string

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been added to cart`,
            body: req.body.productId,
        })
    }

    async modifyItemQuantity(req: Request, res: Response): Promise<void> {
        await usersServices.modifyItemQuantity(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The item quantity has been modified',
        })
    }

    async deleteItemFromCart(req: Request, res: Response): Promise<void> {
        const product = req.params.productId

        await usersServices.deleteItemFromCart(req)

        res.status(201).send({
            status: 'Success',
            msg: `The item ${product} has been deleted from cart`,
        })
    }

    async cleanShoppingCart(req: Request, res: Response): Promise<void> {
        await usersServices.cleanShoppingCart(req)

        res.status(201).send({
            status: 'Success',
            msg: 'The shopping cart was cleaned',
        })
    }
}
export default new UsersController()
