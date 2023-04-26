import type { Response } from 'express'

export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export class HttpResponse {
    Ok(res: Response, data: unknown) {
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            status: 'Success',
            body: data,
        })
    }

    Created(res: Response, data: unknown) {
        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            status: 'Created',
            body: data,
        })
    }

    BadRequest(res: Response, data: unknown) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            status: 'Bad Request',
            error: data,
        })
    }

    NotFound(res: Response, data: unknown) {
        return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            status: 'Not Found',
            error: data,
        })
    }

    Unauthorized(res: Response, data: unknown) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            status: 'Unauthorized',
            error: data,
        })
    }

    InternalServerError(res: Response, data: unknown) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            status: 'Internal Server Error',
            error: data,
        })
    }
}
