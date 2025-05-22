import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const { pathname } = request.nextUrl;
        const segments = pathname.split('/')
        const userId = segments[3];
        const orderId = segments[4];
        
        const user = await UserModel.findById(userId);

        if(!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "No valid user found"
            }, {
                status: 404
            })
        }
        
        const order = await OrderModel.findById(orderId).populate("products.product").populate("coupons.coupon");

        return NextResponse.json({
            success: true,
            message: "Successfully fetched all the orders",
            response: order
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: "Error in getting the orders",
            response: error
        }, {
            status: 500
        })
    }
}
export const dynamic = 'force-dynamic'