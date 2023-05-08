import type { CookieOptions } from 'express'

import { config } from '../config'

export const DEFAULT_AVATAR_PATH = '/uploads/images/default_avatar.png'

export const LOGIN = 'login'
export const REGISTER = 'register'

export const CORE_PATH = '/uploads/core/'
export const IMAGES_PATH = '/uploads/images/'

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
