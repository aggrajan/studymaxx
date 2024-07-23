import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { email, password } = reqBody;
        const currentUser = await UserModel.findOne({email});
        if(!currentUser) {
            return NextResponse.json({
                success: false,
                message: "User doesn't exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, currentUser.password!);
        if(!isPasswordCorrect) {
            return NextResponse.json({
                success: false,
                message: "Incorrect Password"
            })
        }

        const tokenData = {
            id: currentUser._id
        }
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 1);
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!,{expiresIn: '1h'});
        const response = NextResponse.json({
            message: "Logged in Success",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            expires: expiryDate
        });
        
        response.cookies.set("isAdmin", currentUser?.isAdmin === undefined ? "false" : (currentUser.isAdmin ? "true" : "false"), {
            httpOnly: true,
            expires: expiryDate
        });

        return response;
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message,
            response: {
                statusCode: 500
            }
        })
    }
}