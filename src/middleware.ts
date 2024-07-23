import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware';
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
    const token = cookies().get("token")?.value || "";
    const isAdmin = cookies().get("isAdmin")?.value || "false";
    const url = request.nextUrl;
    if(token && ( 
        url.pathname.startsWith('/sign-in') || 
        url.pathname.startsWith('/sign-up') || 
        url.pathname.startsWith('/verify')
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if((url.pathname.startsWith('/add-book') || url.pathname.startsWith('/edit-book')) && isAdmin === "false") {
        return NextResponse.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/profile',
        '/add-book',
        '/'
    ]
}