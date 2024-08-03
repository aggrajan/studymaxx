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
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const user = await UserModel.findById(userId);
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const feedbackInstance = new FeedbackModel({
            userId,
            name,
            email,
            book,
            feedback
        });

        await feedbackInstance.save();

        return NextResponse.json({
            success: true,
            message: "Feedback submitted successfully"
        }, {
            status: 200 
        });
    } catch(error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in submitting the feedback"
        }, {
            status: 500
        })
    }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const user = await UserModel.findById(userId);
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const feedbacks = await FeedbackModel.find({ userId });
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