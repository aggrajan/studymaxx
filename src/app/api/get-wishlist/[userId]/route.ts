import dbConnect from "@/lib/dbConnect";
import WishlistModel from "@/model/Wishlist";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { pathname } = request.nextUrl;
    const userId = pathname.split("/").pop();

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing userId"
      }, { status: 400 });
    }

    // Check if user exists and is verified (optional, based on your requirements)
    const user = await UserModel.findById(userId);
    if (!user || !user.isVerified) {
      return NextResponse.json({
        success: false,
        message: "User not found or not verified"
      }, { status: 404 });
    }

    const wishlist = await WishlistModel.findOne({ user: userId })
      .populate("items.product"); // populate book details

    if (!wishlist) {
      return NextResponse.json({
        success: true,
        message: "Wishlist is empty",
        response: []
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully retrieved wishlist",
      response: wishlist.items
    }, { status: 200 });

  } catch (error: any) {
    console.error("GET /get-wishlist/[userId] error:", error);
    return NextResponse.json({
      success: false,
      message: "Server error while fetching wishlist"
    }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
