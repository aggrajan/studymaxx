import dbConnect from "@/lib/dbConnect";
import OrderModel from "@/model/Order";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const reqBody = await request.json();
        const { userId, products, address, total, subtotal, shipping, discount, name, email, numberOfItems, orderStatus } = reqBody;
        const newOrder = new OrderModel({
            userId, products, address, total, subtotal, shipping, discount, name, email, numberOfItems, orderStatus
        })

        await newOrder.save();

        return NextResponse.json({
            success: true,
            message: "order has been added successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while adding order"
        }, 
        {
            status: 500
        })
    }
}