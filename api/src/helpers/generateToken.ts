import type { Role } from '@prisma/client'

import jwt from 'jsonwebtoken'

import { config } from '../config/env'

export interface ITokenSignProps {
    id: string
    role: Role
}

export async function tokenSign({
    id,
    role,
}: ITokenSignProps): Promise<string> {
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

export async function verifyToken(
    token: string
): Promise<string | jwt.JwtPayload | null> {
    try {
        return jwt.verify(token, config.SECRET)
    } catch (error) {
        console.error(error)

        return null
    }
}
