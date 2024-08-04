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

        // Ensure the book exists
        const book = await BooksModel.findById(bookId);
        if (!book) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        const user = await UserModel.findById(userId);
        if (!user || !user.isVerified) {
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

        // Update the user document by removing the specific cart item
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { $pull: { cart: { _id: cartItem._id } } },
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({
                success: false,
                message: "Failed to update user"
            }, {
                status: 500
            });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully removed book from cart"
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: `Error: ${error.message}`
        }, { status: 500 });
    }
}
