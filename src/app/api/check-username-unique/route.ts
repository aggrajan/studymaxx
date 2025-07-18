import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const searchParams = request.nextUrl.searchParams;
        const queryParam = {
            username: searchParams.get("username")
        };

        const result = UsernameQuerySchema.safeParse(queryParam);
        if(!result.success) {
            const usernameErrors = result.error.format().username?._errors || []
            return NextResponse.json({
                success: false,
                message: usernameErrors.length > 0 ? usernameErrors.join(', ') : "Invalid Query Parameters"
            }, {
                status: 400
            })
        }

        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingVerifiedUser) {
            return NextResponse.json({
                success: false,
                message: "Username is already taken"
            }, {
                status: 400
            })
        }

        return NextResponse.json({
            success: true,
            message: "Username is available"
        }, {
            status: 200
        })
    } catch(error: any) {
        console.error("Error checking username ", error);
        return NextResponse.json({
            success: false,
            message: "Error checking username"
        }, {
            status: 500
        })
    }
}

export const dynamic = "force-dynamic";