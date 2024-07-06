import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import { sendResetPassword } from "@/helpers/sendResetPassword";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const { email, username } = await request.json();
        const currentUser = await UserModel.findOne({username});
        if(!currentUser) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exist."
            }, {
                status: 404
            })
        }

        const forgotPasswordCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);

        const emailResponse = await sendResetPassword(email, currentUser.username || "user", forgotPasswordCode, expiryDate);
        
        if(!emailResponse.success) {
            return NextResponse.json({
                success: false,
                message: emailResponse.message,
            }, {
                status: 500
            })
        }  

        return NextResponse.json({
            success: true,
            message: "Reset Password Mail sent successfully",
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
        }, {
            status: 500
        })
    }
}