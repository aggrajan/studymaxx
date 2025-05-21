import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import QueryModel from "@/model/Query";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { name, email, subject, message } = reqBody;
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const user = await UserModel.findById(userId);
        if(!user || !user.isVerified) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const queryInstance = new QueryModel({
            user: userId,
            name,
            email,
            subject,
            message
        });

        await queryInstance.save();

        return NextResponse.json({
            success: true,
            message: "Query submitted successfully"
        }, {
            status: 200 
        });
    } catch(error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in submitting the query"
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

        const queries = await QueryModel.find({ userId });
        return NextResponse.json({
            success: true,
            message: "Queries retrieved",
            response: queries
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