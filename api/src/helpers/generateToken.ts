import type { Role } from '@prisma/client'
import type { JwtPayload } from 'jsonwebtoken'

import jwt from 'jsonwebtoken'

import { config } from '../config'

import { HttpError } from './customError'

export interface ITokenSignProps {
    id: string
    role: Role
}

interface GoogleDecodedToken {
    email: string
    email_verified: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
}

export function signToken({ id, role }: ITokenSignProps) {
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

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, config.SECRET) as JwtPayload
    } catch (error) {
        throw new HttpError(401, 'Invalid token')
    }
}

export function verifyTokenWithoutBreaking(token: string) {
    try {
        return jwt.verify(token, config.SECRET) as JwtPayload
    } catch (error) {
        return null
    }
}

export function decodeToken(token: string) {
    return jwt.decode(token) as GoogleDecodedToken
}
