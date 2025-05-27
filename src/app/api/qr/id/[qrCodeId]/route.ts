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
        const { pathname } = request.nextUrl;
        const qrCodeId = pathname.split('/').pop();
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

        const qrInstance = await QRModel.findByIdAndUpdate(qrCodeId, {
            code, url
        }, { new: true });


        return NextResponse.json({
            success: true,
            message: "QR editted successfully"
        }, {
            status: 200 
        });
    } catch(error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Error in editing the QR"
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
        const { pathname } = request.nextUrl;
        const qrCodeId = pathname.split('/').pop();
        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const qrs = await QRModel.findById(qrCodeId);
        return NextResponse.json({
            success: true,
            message: "QR retrieved",
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