import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import CouponModel from "@/model/Coupon";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const dataResponse = await getDataFromToken(request)
        const userId = dataResponse.response;

        const user = await UserModel.findById(userId);
        if(!user || !user.isVerified || !user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "Invalid User"
            }, {
                status: 404
            });
        }

        const reqBody = await request.json();
        const { couponName, couponDescription, lastValidityDate, couponType, couponValue, minimumAmount } = reqBody;
        const newCoupon = new CouponModel({
            couponName, couponDescription, lastValidityDate, couponType, couponValue, minimumAmount
        })

        await newCoupon.save();

        return NextResponse.json({
            success: true,
            message: "coupon has been added successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while adding coupon"
        }, 
        {
            status: 500
        })
    }
}