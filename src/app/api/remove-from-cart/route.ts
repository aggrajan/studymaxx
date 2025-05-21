import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel from "@/model/Cart";
import BooksModel from "@/model/Books";
import UserModel from "@/model/User";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { bookId } = await request.json();
    const userIdResponse = await getDataFromToken(request);
    const userId = userIdResponse.response;

    // Ensure user is valid and verified
    const user = await UserModel.findById(userId);
    if (!user || !user.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found or not verified",
        },
        { status: 404 }
      );
    }

    // Ensure book exists
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    // Find the user's cart
    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        {
          success: false,
          message: "Cart not found",
        },
        { status: 404 }
      );
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === bookId
    );
    if (!existingItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found in cart",
        },
        { status: 404 }
      );
    }

    // Remove item from cart
    cart.items = cart.items.filter(
      (item) => item.product.toString() !== bookId
    );
    await cart.save();

    return NextResponse.json(
      {
        success: true,
        message: "Successfully removed book from cart",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Remove-from-cart error:", error);
    return NextResponse.json(
      {
        success: false,
        message: `Server Error: ${error.message}`,
      },
      { status: 500 }
    );
  }
}
