import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
import ReviewModel from "@/model/Review";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { userId, bookId, reviewId } = reqBody;

        const book = await BooksModel.findById(bookId);
        if(!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        const user = await UserModel.findById(userId);
        if(!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }
        
        await ReviewModel.deleteOne({ userId: userId, bookId: bookId, _id: reviewId });

        return NextResponse.json({
            success: true,
            message: "Successfully deleted your review",
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {
            status: 200
        })
    }
}