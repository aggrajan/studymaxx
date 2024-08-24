import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel, { CartItem } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";
import OrderModel from "@/model/Order";
import { orderStatus as orderStatusEnum } from "@/model/Enums";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const dataResponse = await getDataFromToken(request);
        const userId = dataResponse.response;

        const user = await UserModel.findById(userId);
        if(!user || !user.isVerified || !user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "Invalid User"
            }, {
                status: 404
            });
        }
        const reqBody = await request.json();
        const { id, orderStatus } = reqBody;

        if(orderStatusEnum.findIndex((status: string) => status === orderStatus) === -1) {
            return NextResponse.json({
                success: false,
                message: "Invalid Order Status"
            }, 
            {
                status: 503
            })
        }

        await OrderModel.findByIdAndUpdate(id, {
            orderStatus: orderStatus
        });

        return NextResponse.json({
            success: true,
            message: "Order has been updated successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while deleting Order"
        }, 
        {
            status: 500
        })
    }
}