import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import CouponModel from "@/model/Coupon";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { couponId } = reqBody;
        console.log(couponId);
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;
        

        const existingCoupon = CouponModel.findById(couponId);
        if(!existingCoupon) {
            return NextResponse.json({
                success: false,
                message: "Coupon not found"
            }, {
                status: 404
            });
        }

        const user = await UserModel.findByIdAndUpdate(userId, { 
            $addToSet: { 
                coupons: couponId 
            } 
        }, {
            new : true 
        });

        if(!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true, 
            message: "Successfully added coupon"
        }, {status: 200})
    } catch(error: any) {
        return NextResponse.json({
            success: false, 
            message: "Coupon can't be added"
        }, {status: 500})
    }
}