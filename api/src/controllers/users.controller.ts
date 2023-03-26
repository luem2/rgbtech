import type { Request, Response } from 'express'

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

    async changeProfile(req: Request, res: Response): Promise<void> {
        const profileEdited = await usersServices.changeProfile(req)

        res.status(200).send({
            status: 'Success',
            msg: 'All users were sent correctly',
            body: profileEdited,
        })
    }
}

export default new UsersController()
