import dbConnect from "@/lib/dbConnect";
import CouponModel from "@/model/Coupon";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const { pathname } = request.nextUrl;
        const couponName = pathname.split('/').pop();
        const coupon = await CouponModel.find({ couponName: couponName });

        if(!coupon) {
            return NextResponse.json({
                success: false,
                message: "Coupon doesn't exists",
            }, {
                status: 404
            })
        }

        const response = NextResponse.json({
            success: true,
            message: "Successfully fetched the coupons",
            response: coupon
        }, {
            status: 200,
        });

        return response;
    } catch (error: any) {
        const response = NextResponse.json({
            success: false,
            message: "Error in getting the coupon"
        }, {
            status: 500,
        });

        return response;
    }
}
export const dynamic = 'force-dynamic'