import { NextRequest, NextResponse } from "next/server";
export { default } from 'next-auth/middleware';
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function middleware(request: NextRequest) {
    let token = cookies().get("token")?.value || "";
    const isAdmin = cookies().get("isAdmin")?.value || "false";
    const url = request.nextUrl;
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if(token && ( 
        url.pathname.startsWith('/sign-in') || 
        url.pathname.startsWith('/sign-up') || 
        url.pathname.startsWith('/verify')  
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if((url.pathname.startsWith('/add-book')      || 
        url.pathname.startsWith('/edit-book')     || 
        url.pathname.startsWith('/all-feedbacks') ||
        url.pathname.startsWith('/all-queries')) && isAdmin === "false") {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(token === "" && (url.pathname.startsWith('/user-profile') || url.pathname.startsWith('/wishlist'))) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const response = NextResponse.next();
    return response;
}

export const config = {
    matcher: [
        '/sign-in',
        '/sign-up',
        '/verify',
        '/user-profile',
        '/user-profile/edit',
        '/add-book',
        '/all-feedbacks',
        '/edit-book',
        '/all-queries',
        '/wishlist',
        '/'
    ]
}