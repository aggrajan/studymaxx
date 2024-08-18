import dbConnect from "@/lib/dbConnect";
import CouponModel from "@/model/Coupon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const coupons = await CouponModel.find();

        const response = NextResponse.json({
            success: true,
            message: "Successfully fetched all the coupons",
            response: coupons
        }, {
            status: 200,
        });

        return response;
    } catch (error: any) {
        const response = NextResponse.json({
            success: false,
            message: "Error in getting the coupons"
        }, {
            status: 500,
        });

        return response;
    }
}
export const dynamic = 'force-dynamic'