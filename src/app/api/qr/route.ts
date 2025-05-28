import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import QRModel from "@/model/QR";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { code, url } = reqBody;
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

        const qrInstance = new QRModel({
            code,
            url
        });

        await qrInstance.save();

        return NextResponse.json({
            success: true,
            message: "QR submitted successfully"
        }, {
            status: 200 
        });
    } catch(error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in submitting the QR"
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

        const qrs = await QRModel.find();
        return NextResponse.json({
            success: true,
            message: "QRs retrieved",
            response: qrs
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