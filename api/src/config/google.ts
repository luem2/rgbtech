import type { GetGoogleOAuthURLProps, GoogleTokensResult } from '../types'

import axios from 'axios'

import {
    GOOGLE_LOGIN_REDIRECT,
    GOOGLE_REGISTER_REDIRECT,
} from '../helpers/constants'

import { config } from '.'

export function getGoogleOAuthURL(option: GetGoogleOAuthURLProps) {
    const rootURL = 'https://accounts.google.com/o/oauth2/v2/auth'
    const redirect_URL =
        config.NODE_ENV === 'production'
            ? config.ORIGIN_CORS
            : `http://localhost:${config.PORT}`

    const options = {
        redirect_uri:
            option === 'login'
                ? redirect_URL + GOOGLE_LOGIN_REDIRECT
                : redirect_URL + GOOGLE_REGISTER_REDIRECT,
        client_id: config.GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ].join(' '),
    }

    const qs = new URLSearchParams(options)

    return rootURL + '?' + qs.toString()
}

export async function getGoogleOAuthTokens(
    code: string
): Promise<GoogleTokensResult> {
    const rootURL = 'https://oauth2.googleapis.com/token'
    const redirect_URL =
        config.NODE_ENV === 'production'
            ? config.ORIGIN_CORS
            : `http://localhost:${config.PORT}`

    const values = {
        code,
        client_id: config.GOOGLE_CLIENT_ID,
        client_secret: config.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirect_URL,
        grant_type: 'authorization_code',
    }

    const qs = new URLSearchParams(values)

    const { data } = await axios.post<GoogleTokensResult>(
        rootURL,
        qs.toString(),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }
    )

    return data
}
