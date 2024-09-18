import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { COOKIES_ACCESS_TOKEN } from './context/actionTypes';

// Step 1. HTTP Basic Auth Middleware for Challenge
export function middleware(req: NextRequest) {
    const url:any = req.nextUrl.clone()
    console.log('middleware_called', url);
    let isAuth = req.cookies.has(COOKIES_ACCESS_TOKEN)
    if (req.nextUrl.pathname.startsWith('/')) {
        if (!isAuth) {
            url.pathname = `/auth/login`
            return NextResponse.redirect(url)
        }
    }
}
export const config = {
    matcher: ['/'],
}