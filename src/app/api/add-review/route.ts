// app/api/reviews/route.ts

import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
import ReviewModel from "@/model/Review";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface ReviewRequest {
  userId: string;
  bookId: string;
  review: string;
  rating: number;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { userId, bookId, review, rating }: ReviewRequest = await request.json();

    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user or book ID" },
        { status: 400 }
      );
    }

    // Check book exists
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    // Check user exists & is verified
    const user = await UserModel.findById(userId);
    if (!user || !user.isVerified) {
      return NextResponse.json(
        { success: false, message: "User not found or not verified" },
        { status: 404 }
      );
    }

    // Optional: prevent duplicate reviews by same user on same book
    const existing = await ReviewModel.findOne({ user: userId, book: bookId });
    if (existing) {
      return NextResponse.json(
        { success: false, message: "You have already reviewed this book" },
        { status: 409 }
      );
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Create and save
    const newReview = new ReviewModel({
      user: new mongoose.Types.ObjectId(userId),
      book: new mongoose.Types.ObjectId(bookId),
      review: review.trim(),
      rating,
    });
    await newReview.save();

    return NextResponse.json(
      { success: true, message: "Review submitted successfully" },
      { status: 201 }
    );

  } catch (error: any) {
    console.error("Review API error:", error);
    return NextResponse.json(
      { success: false, message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
