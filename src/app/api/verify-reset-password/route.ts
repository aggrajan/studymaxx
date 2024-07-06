import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const { token, newPassword } = await request.json();

        const existingUser = await UserModel.findOne({forgotPasswordCode: token, forgotPasswordCodeExpiry: {$gt: Date.now()}});

        if(!existingUser) {
            return NextResponse.json({
                success: false,
                message: "Invalid token",
                response: {
                    statusCode: 500
                }
            }, {
                status: 500
            })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10)
        existingUser.isVerified = true;
        existingUser.forgotPasswordCode = undefined;
        existingUser.forgotPasswordCodeExpiry = undefined;
        existingUser.password = hashedPassword;
        await existingUser.save();

        return NextResponse.json({
            success: true,
            message: ' successfully',
            response: {
                statusCode: 200
            }
        })
        return NextResponse.json({})
    } catch(error: any) {
        return NextResponse.json({
            success: true,
            message: error.message
        }, {
            status: 500
        });
    }
}