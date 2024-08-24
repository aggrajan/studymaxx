import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const { pathname } = request.nextUrl;
        const userId = pathname.split('/').pop()
        
        const user = await UserModel.findById(userId);

        if(!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "No valid user found"
            }, {
                status: 404
            })
        }
        
        
        
        const orders = await OrderModel.find({ userId: userId });

        return NextResponse.json({
            success: true,
            message: "Successfully fetched all the orders",
            response: orders
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: "Error in getting the orders"
        }, {
            status: 500
        })
    }
}
export const dynamic = 'force-dynamic'