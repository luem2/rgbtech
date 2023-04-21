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
            msg: 'Success',
            body: data,
        })
    }

    Created(res: Response, data: unknown) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.CREATED,
            msg: 'Created',
            body: data,
        })
    }

    BadRequest(res: Response, data: unknown) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            statusCode: HttpStatus.BAD_REQUEST,
            msg: 'Bad Request',
            error: data,
        })
    }

    NotFound(res: Response, data: unknown) {
        return res.status(HttpStatus.NOT_FOUND).json({
            statusCode: HttpStatus.NOT_FOUND,
            msg: 'Not Found',
            error: data,
        })
    }

    Unauthorized(res: Response, data: unknown) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            statusCode: HttpStatus.UNAUTHORIZED,
            msg: 'Unauthorized',
            error: data,
        })
    }

    InternalServerError(res: Response, data: unknown) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            msg: 'Internal Server Error',
            error: data,
        })
    }
}
