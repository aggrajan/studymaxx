import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
import ReviewModel from "@/model/Review";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        
        const { pathname } = request.nextUrl;
        const bookId = pathname.split('/').pop();

         if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
            return NextResponse.json({
                success: false,
                message: "Invalid or missing bookId"
            }, { status: 400 });
        }
        
        const { searchParams } = new URL(request.url);
        const page: number = parseInt(searchParams.get('page') || '1');
        const increment: number = parseInt(searchParams.get('increment') || '5');
        const userId: string = searchParams.get("userId") || "";
        const excludeUser: boolean = searchParams.get("notAllowedUserId") === "true";

        const book = await BooksModel.findById(bookId);
        if(!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        const query: any = { book: bookId };
        if (userId) {
            query.user = excludeUser ? { $ne: userId } : userId;
        }

        
        const reviews = await ReviewModel.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * increment)
            .limit(increment)
            .populate("user")
            .populate("book"); 

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
