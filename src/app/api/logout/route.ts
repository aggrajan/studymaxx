import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel, { User } from "@/model/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const token = cookies().get("token")?.value || "";
        
        const userId : any = jwt.verify(token, process.env.TOKEN_SECRET!, function(err, decoded) {
            if(err) {
                if(err.message === "jwt expired") {
                    cookies().delete("token");
                }
            }

            return decoded
        });
        
        const user = await UserModel.findById(userId.id).select("-password");
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            })
        }
        const response = NextResponse.json({
            message: "Logout Successfully",
            success: true
        }, {
            status: 200
        })
    
        user.verifyCode = undefined;
        user.verifyCodeExpiry = undefined;
        await user.save();
        

        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return response
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            response: {
                statusCode: 500
            }
        }, {
            status: 500
        })
    }
}