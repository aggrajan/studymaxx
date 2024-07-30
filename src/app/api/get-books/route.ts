import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const books = await BookModel.find();

        const response = NextResponse.json({
            success: true,
            message: "Successfully fetched all the books",
            response: books
        }, {
            status: 200,
        });

        return response;
    } catch (error: any) {
        const response = NextResponse.json({
            success: false,
            message: "Error in getting the books"
        }, {
            status: 500,
        });

        return response;
    }
}
export const dynamic = "force-dynamic";