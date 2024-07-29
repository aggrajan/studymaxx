import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import FeedbackModel from "@/model/Feedback";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const user = await UserModel.findById(userId);
        if(!user || !user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const feedbacks = await FeedbackModel.find();
        return NextResponse.json({
            success: true,
            message: "Feedbacks retrieved",
            response: feedbacks
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong communicating with server"
        }, {
            status: 500
        })
    }
}