import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const books = await BookModel.find();
        return NextResponse.json({
            success: true,
            message: "Successfully fetched all the books",
            response: books
        }, {
            status: 200
        })
    } catch(error: any) {
        return NextResponse.json({
            success: false,
            message: "Error in getting the books"
        }, {
            status: 500
        })
    }
}