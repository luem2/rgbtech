import type { Request, Response } from 'express'

import { AwardServices } from '../services/awards.services'
import { BaseControllers } from '../config/bases'

export class AwardControllers extends BaseControllers<AwardServices> {
    constructor() {
        super(AwardServices)
    }

    getAllAwards = async (_req: Request, res: Response) => {
        const awards = await this.services.getAllAwards()

        this.httpResponse.Ok(res, {
            msg: 'All awards have been successfully sent',
            awards_count: awards.length,
            awards,
        })
    }

    getAward = async ({ body }: Request, res: Response) => {
        this.httpResponse.Ok(res, {
            msg: 'Award have been successfully sent',
            award: body,
        })
    }

    awardUpdate = async (req: Request, res: Response) => {
        const updatedAward = await this.services.awardUpdate(req)

        this.httpResponse.Ok(res, {
            msg: 'Award have been successfully updated',
            updatedAward,
        })
    }

    addAward = async (req: Request, res: Response) => {
        const newAward = await this.services.addAward(req)

        this.httpResponse.Created(res, {
            msg: 'Award have been successfully created',
            award: newAward,
        })
    }

    deleteAward = async (req: Request, res: Response) => {
        const deletedAward = await this.services.deleteAward(req.body)

        this.httpResponse.Ok(res, {
            msg: 'Award have been successfully deleted',
            award: deletedAward,
        })
    }
}
