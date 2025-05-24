import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import CartModel from "@/model/Cart";

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

    const cart = await CartModel.findOne({ user: userId })
      .populate("user")
      .populate("items.product");

    if (!cart) {
      return NextResponse.json({
        success: true,
        message: "Cart is empty",
        response: []
      }, { status: 200 });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully retrieved wishlist",
      response: cart
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
