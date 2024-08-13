import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try{
        await dbConnect();
        const reqBody = await request.json();
        const { token, username } = reqBody;

        const currentUser = await UserModel.findOne({username: username ,verifyCode: token, verifyCodeExpiry: {$gt: Date.now()}});
        if(!currentUser) {
            return NextResponse.json({
                success: false,
                message: "Invalid token",
                response: {
                    statusCode: 500
                }
            })
        }

        currentUser.isVerified = true;
        currentUser.verifyCode = undefined;
        currentUser.verifyCodeExpiry = undefined;
        await currentUser.save();

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
            response: {
                statusCode: 200
            }
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            response: {
                statusCode: 500
            }
        })
    }

}