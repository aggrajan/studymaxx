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

        // Validate book existence
        const book = await BooksModel.findById(bookId);
        if (!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        // Validate user existence and verification
        const user = await UserModel.findById(userId);
        if (!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not found or not verified"
            }, {
                status: 404
            });
        }

        // Find the review to verify ownership
        const review = await ReviewModel.findById(reviewId);
        if (!review) {
            return NextResponse.json({
                success: false,
                message: "Review not found"
            }, {
                status: 404
            });
        }

        // Check if the review belongs to the user (or add admin check here if you want)
        if (review.user.toString() !== userId.toString()) {
            return NextResponse.json({
                success: false,
                message: "You are not authorized to delete this review"
            }, {
                status: 403
            });
        }

        // Delete the review
        await ReviewModel.deleteOne({ _id: reviewId });

        return NextResponse.json({
            success: true,
            message: "Successfully deleted your review"
        }, {
            status: 200
        });
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "Something went wrong"
        }, {
            status: 500
        });
    }
}
