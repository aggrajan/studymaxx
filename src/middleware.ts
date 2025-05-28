import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value || "";
    const isAdmin = request.cookies.get("isAdmin")?.value || "false";
    const url = request.nextUrl;
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if(token && ( 
        url.pathname.startsWith('/sign-in') || 
        url.pathname.startsWith('/sign-up') || 
        url.pathname.startsWith('/verify')  ||
        url.pathname.startsWith('/reset-password')
    )) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const adminRoutes = [
        '/add-book', '/edit-book', '/all-feedbacks', '/all-queries',
        '/add-coupon', '/edit-coupon', '/all-coupons', '/all-orders',
        '/qr/add', '/qr/view'
    ];

    if (adminRoutes.some(path => url.pathname.startsWith(path)) && isAdmin === "false") {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if(token === "" && (url.pathname.startsWith('/user-profile') || url.pathname.startsWith('/wishlist')
     || url.pathname.startsWith('/queries') || url.pathname.startsWith('/my-orders'))) {
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
        '/verify-reset-password',
        '/about-us',
        '/feedback',
        '/mission',
        '/faq',
        '/products/:path*',
        '/policy',
        '/user-profile',
        '/user-profile/edit',
        '/add-book',
        '/cart',
        '/payment',
        '/all-feedbacks',
        '/edit-book',
        '/all-queries',
        '/wishlist',
        '/reset-password',
        '/queries',
        '/payment',
        '/add-coupon',
        '/edit-coupon',
        '/all-coupons',
        '/all-orders/:path*',
        '/my-orders',
        '/qr/:path*',
        '/'
    ]
}