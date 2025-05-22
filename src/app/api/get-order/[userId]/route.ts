import mongoose from "mongoose";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { pathname } = request.nextUrl;
    const userId = pathname.split("/").pop();

    // Validate userId presence and format
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json({
        success: false,
        message: "Invalid or missing userId parameter",
      }, { status: 400 });
    }

    // Check user existence and verification
    const user = await UserModel.findById(userId);
    if (!user || !user.isVerified) {
      return NextResponse.json({
        success: false,
        message: "No valid user found",
      }, { status: 404 });
    }

    // Fetch orders for user using correct field 'user'
    const orders = await OrderModel.find({ user: userId }).populate("products.product").populate("coupons.coupon");

    return NextResponse.json({
      success: true,
      message: "Successfully fetched all the orders",
      response: orders,
    }, { status: 200 });
  } catch (error: any) {
    console.error("GET /get-order/[userId] error:", error);
    return NextResponse.json({
      success: false,
      message: "Error in getting the orders",
    }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";
