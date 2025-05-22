import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

interface AddOrderRequest {
  userId?: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  address: any;
  total: number;
  subtotal: number;
  shipping: number;
  discount: number;
  name: string;
  email: string;
  numberOfItems: number;
  orderStatus: string;
  coupons?: string[]; // coupon IDs
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const reqBody: AddOrderRequest = await request.json();
    const {
      userId,
      products,
      address,
      total,
      subtotal,
      shipping,
      discount,
      name,
      email,
      numberOfItems,
      orderStatus,
      coupons = [],
    } = reqBody;

    // Convert product list to CartItem format
    const formattedProducts = products.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    // Convert coupon IDs into CouponItem schema
    const formattedCoupons = coupons.map((couponId) => ({
      coupon:couponId,
    }));

    const newOrder = new OrderModel({
      user: userId ? userId : undefined,
      products: formattedProducts,
      address,
      total,
      subtotal,
      shipping,
      discount,
      name,
      email,
      numberOfItems,
      orderStatus,
      coupons: formattedCoupons,
    });

    await newOrder.save();

    return NextResponse.json(
      {
        success: true,
        message: "Order has been added successfully",
        orderId: newOrder._id,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.log("Order API Error:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while adding the order",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
