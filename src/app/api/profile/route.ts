import { getDataFromToken } from "@/helpers/getDataFromToken";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const dataResponse = await getDataFromToken(request)
    const userId = dataResponse.response;
    
    if(!userId || !dataResponse) {
        return NextResponse.json({
            success: false,
            message: "No user found"
        }, {
            status: 404
        })
    }

    const user = await UserModel.findOne({_id: userId}).select("-password");
    console.log(userId, user, dataResponse)
    if(!user) {
        return NextResponse.json({
            success: false,
            message: "No user found"
        }, {
            status: 404
        })
    }
    return NextResponse.json({
        success: true,
        response: user,
        message: "User Found"
    })
}