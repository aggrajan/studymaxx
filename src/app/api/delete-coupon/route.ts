import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel, { CartItem } from "@/model/User";
import BookModel, { Book } from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";
import CouponModel from "@/model/Coupon";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const dataResponse = await getDataFromToken(request);
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
        const { id } = reqBody;
        await CouponModel.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "coupon has been deleted successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while deleting coupon"
        }, 
        {
            status: 500
        })
    }
}