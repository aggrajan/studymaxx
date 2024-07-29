import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import BooksModel from "@/model/Books";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { bookId } = reqBody;
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const book = await BooksModel.findById(bookId);
        if(!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        const user = await UserModel.findByIdAndUpdate(userId, { 
            $pull: 
                { 
                    wishlist: { _id: bookId } 
                } 
            },
            {
                new : true 
            }
        );

        if(!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true, 
            message: "Successfully removed book"
        }, {status: 200})
    } catch(error: any) {
        return NextResponse.json({
            success: false, 
            message: "Book can't be removed"
        }, {status: 500})
    }
}