import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import BooksModel from "@/model/Books";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { bookId, amount } = reqBody;
        const userIdResponse = await getDataFromToken(request);
        const userId = userIdResponse.response;

        const book = await BooksModel.findById(bookId);
        if (!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        // Find the user and ensure the cart item exists
        const user = await UserModel.findById(userId);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
        }

        const cartItem = user.cart.find(item => item.product.id.toString() === bookId);
        if (!cartItem) {
            return NextResponse.json({
                success: false,
                message: "Cart item not found"
            }, {
                status: 404
            });
        }

        const updatedUser = await UserModel.findOneAndUpdate(
            { _id: userId, "cart.product._id": bookId }, 
            { 
                $inc: { "cart.$.quantity": amount } 
            },
            { 
                new: true 
            }
        );

        if (!user) {
            return NextResponse.json({
                success: false,
                message: "User or cart item not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully increased quantity"
        }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({
            success: false,
            message: "Could not increase quantity"
        }, { status: 500 });
    }
}
