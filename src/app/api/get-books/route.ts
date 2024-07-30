import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const books = await BookModel.find();


        const response = NextResponse.json({
            success: true,
            message: "Successfully fetched all the books",
            response: books
        }, {
            status: 200
        })

        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');
        return response;
    } catch(error: any) {
        const response = NextResponse.json({
            success: false,
            message: "Error in getting the books"
        }, {
            status: 500
        })

        response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.headers.set('Pragma', 'no-cache');
        response.headers.set('Expires', '0');
        response.headers.set('Surrogate-Control', 'no-store');
        return response;
    }
}