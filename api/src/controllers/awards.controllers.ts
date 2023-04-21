import type { Request, Response } from 'express'

import awardsServices from '../services/awards.services'

class AwardsControllers {
    async getAllAwards(req: Request, res: Response) {
        const awards = await awardsServices.getAllAwards(req.userRole)

        res.status(200).send({
            status: 'Success',
            msg: 'All awards have been successfully sent',
            body: {
                awards,
                count: awards.length,
            },
        })
    }

    async getAward(req: Request, res: Response) {
        const award = await awardsServices.getAward(req)

        if (!award)
            return res.status(404).send({
                status: 'Error',
                msg: 'Award not found',
            })

        res.status(200).send({
            status: 'Success',
            msg: 'Award have been successfully sent',
            body: award,
        })
    }

    async awardUpdate(req: Request, res: Response) {
        const updatedAward = await awardsServices.awardUpdate(req.body)

        res.status(200).send({
            status: 'Success',
            msg: 'Award have been successfully updated',
            body: updatedAward,
        })
    }

    async addAward(req: Request, res: Response) {
        const newAward = await awardsServices.addAward(req.body)

        res.status(201).send({
            status: 'Success',
            msg: 'Award have been successfully created',
            body: newAward,
        })
    }

    async deleteAward(req: Request, res: Response) {
        const deletedAward = await awardsServices.deleteAward(req.params)

        if (!deletedAward)
            return res.status(404).send({
                status: 'Error',
                msg: 'Award have not been found',
            })

        res.status(200).send({
            status: 'Success',
            msg: 'Award have been successfully deleted',
            body: deletedAward,
        })
    }
}

export default new AwardsControllers()
