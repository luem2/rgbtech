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

        res.status(200).send({
            status: 'Success',
            msg: 'The profile was successfully updated',
            body: profileEdited,
        })
    }

    async updatePassword(req: Request, res: Response): Promise<void> {
        const passwordUpdated = await authServices.passwordUpdate(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The password was successfully updated',
            body: passwordUpdated,
        })
    }

    async changeProfilePhoto(req: Request, res: Response): Promise<void> {
        await usersServices.changeProfilePhoto(req)

        res.status(200).send({
            status: 'Success',
            msg: 'The profile photo was successfully updated',
        })
    }
}
export default new UsersController()
