import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
import ReviewModel from "@/model/Review";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        
        const { pathname } = request.nextUrl;
        const bookId = pathname.split('/').pop();
        const { searchParams } = new URL(request.url);
        const page: number = parseInt(searchParams.get('page') || '1');
        const increment: number = parseInt(searchParams.get('increment') || '5');
        const userId: string = searchParams.get("userId") || "";
        const notAllowedUserId: string = searchParams.get("notAllowedUserId") || "";

        const book = await BooksModel.findById(bookId);
        if(!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }
        
        const reviews = notAllowedUserId === "true" ?
         await ReviewModel.find({ bookId: bookId, userId: { $ne: userId } }).skip(page === 1 ? 0 : (page - 1) * increment).limit(increment) :
         await ReviewModel.find({ bookId: bookId, userId: userId }).skip(page === 1 ? 0 : (page - 1) * increment).limit(increment);

        return NextResponse.json({
            success: true,
            message: "Successfully retrieved reviews",
            response: reviews
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {
            status: 500
        })
    }
}
