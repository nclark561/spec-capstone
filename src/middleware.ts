import { NextResponse } from "next/server";

export function middleware(request: Request) {
    return NextResponse.json({
        message: 'u suck'
      }, {
        status: 400
      })
}

export const config = {
    matcher: '/api/register'
}