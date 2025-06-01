import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import FeedbackModel from "@/model/Feedback";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const reqBody = await request.json();
        const { name, email, book, feedback } = reqBody;

        if (!name || !email || !feedback) {
            return NextResponse.json({
                success: false,
                message: "Name, email, and feedback are required"
            }, { status: 400 });
        }

        // Extract userId from token (not from request body)
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const feedbackData: any = {
            name,
            email,
            book,
            feedback,
            user: userId 
        };

        const feedbackInstance = new FeedbackModel(feedbackData);
        await feedbackInstance.save();

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully"
        }, { status: 200 });
    } catch (error: any) {
        console.error("POST /feedback error:", error);
        return NextResponse.json({
            success: false,
            message: "Error in submitting the feedback"
        }, { status: 500 });
    }
}


export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const feedbacks = await FeedbackModel.find({ user });  // use "user" field not "userId"
        return NextResponse.json({
            success: true,
            message: "Feedbacks retrieved",
            response: feedbacks
        }, {
            status: 200
        });
    } catch (error: any) {
        console.error("GET /feedback error:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong communicating with server"
        }, {
            status: 500
        });
    }
}
