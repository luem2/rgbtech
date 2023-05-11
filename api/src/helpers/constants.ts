import type { CookieOptions } from 'express'

import { config } from '../config'

export const DEFAULT_AVATAR_PATH = '/uploads/avatars/default_avatar.png'
export const AVATARS_PATH = '/uploads/avatars/'

export const AWARDS_PATH = '/uploads/core/awards/'
export const BRANDS_PATH = '/uploads/core/brands/'
export const CARROUSEL_PATH = '/uploads/core/carrousel/'
export const PRODUCTS_PATH = '/uploads/core/products/'

export const GOOGLE_REDIRECT = '/api/auth/google-auth'

export const COOKIE_OPTIONS: CookieOptions = {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
}
