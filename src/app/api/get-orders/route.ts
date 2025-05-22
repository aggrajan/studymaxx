import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const dataResponse = await getDataFromToken(request);
        const userId = dataResponse.response;
        
        if(!userId || !dataResponse) {
            return NextResponse.json({
                success: false,
                message: "No user exists with given user id"
            }, {
                status: 404
            })
        }

        const user = await UserModel.findById(userId);

        if(!user || !user.isVerified || !user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "No valid user found"
            }, {
                status: 404
            })
        }

        const orders = await OrderModel.find().populate("products.product").populate("coupons.coupon");
        const response = NextResponse.json({
            success: true,
            message: "Successfully fetched all the orders",
            response: orders
        }, {
            status: 200,
        });

        return response;
    } catch (error: any) {
        const response = NextResponse.json({
            success: false,
            message: "Error in getting the orders"
        }, {
            status: 500,
        });

        return response;
    }
}
export const dynamic = 'force-dynamic'