import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
import ReviewModel from "@/model/Review";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { userId, bookId, review, rating, image, name, username } = reqBody;

        const book = await BooksModel.findById(bookId);
        if(!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        console.log("book found");

        const user = await UserModel.findById(userId);
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }
        console.log("user found");
        const newReview = new ReviewModel({
            userId,
            bookId, 
            review,
            image,
            rating,
            name, 
            username
        })

        await newReview.save();

        return NextResponse.json({
            success: true,
            message: "Successfully submitted a review",
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