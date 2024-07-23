import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        
        const { pathname } = request.nextUrl;
        const bookId = pathname.split('/').pop();
        
        const book = await BookModel.findById(bookId);

        return NextResponse.json({
            success: true,
            message: "Successfully fetched all the books",
            response: book
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: "Error in getting the books"
        }, {
            status: 500
        })
    }
}