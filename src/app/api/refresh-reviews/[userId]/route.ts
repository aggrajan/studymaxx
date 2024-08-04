import dbConnect from "@/lib/dbConnect";
import ReviewModel from "@/model/Review";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const { pathname } = request.nextUrl;
        const userId = pathname.split('/').pop();
        const user = await UserModel.findById(userId);
        if (!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const updatedReviews = await ReviewModel.updateMany({ userId: userId }, {
            userId: userId,
            image: user.picture,
            name: user.name,
            username: user.username
        });

        if(!updatedReviews) {
            return NextResponse.json({
                success: false,
                message: "Review not updated"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Reviews updated"
        }, {
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: 500
        });
    }
}