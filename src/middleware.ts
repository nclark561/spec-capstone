import { NextResponse } from "next/server";
//@ts-ignore
import * as jwt from 'jsonwebtoken'

export function middleware(request: Request) {
    const { SECRET } = process.env

    //@ts-ignore
    const headerToken = request.headers.authorization

    if (!headerToken) {
        return NextResponse.json({
            message: 'ERROR IN auth middleware'
        }, {
            status: 401
        })
    }

    let token

    try {
        token = jwt.verify(headerToken, SECRET)
    } catch (err) {
        //@ts-ignore
        err.statusCode = 500
        throw err
    }

    if (!token) {
        const error = new Error('Not authenticated.')
        //@ts-ignore
        error.statusCode = 401
        throw error
    }
}

export const config = {
    matcher: '/api/book'
}