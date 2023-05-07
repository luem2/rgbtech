import type { Role } from '@prisma/client'
import type { JwtPayload } from 'jsonwebtoken'

import jwt from 'jsonwebtoken'

import { config } from '../config'

import { HttpError } from './customError'

export interface ITokenSignProps {
    id: string
    role: Role
}

export async function tokenSign({ id, role }: ITokenSignProps) {
    return jwt.sign(
        {
            id,
            role,
        },
        config.SECRET,
        {
            expiresIn: '24h',
        }
    )
}

export async function verifyToken(token: string) {
    try {
        return jwt.verify(token, config.SECRET) as JwtPayload
    } catch (error) {
        throw new HttpError(401, 'Invalid token')
    }
}
