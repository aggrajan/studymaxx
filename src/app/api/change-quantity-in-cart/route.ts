import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/model/User";
import BooksModel from "@/model/Books";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import CartModel, { CartItem } from "@/model/Cart";
import mongoose from "mongoose";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const { bookId, amount } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const { response: userId } = await getDataFromToken(request);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: "Invalid user ID" },
        { status: 401 }
      );
    }

    const book = await BooksModel.findById(bookId);
    if (!book) {
      return NextResponse.json(
        { success: false, message: "Book not found" },
        { status: 404 }
      );
    }

    const user = await UserModel.findById(userId);
    if (!user || !user.isVerified) {
      return NextResponse.json(
        { success: false, message: "User not found or not verified" },
        { status: 404 }
      );
    }

    const cart = await CartModel.findOne({ user: userId });
    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    const itemIndex = cart.items.findIndex((item: CartItem) =>
      item.product.equals(bookId)
    );

    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Item not found in cart" },
        { status: 404 }
      );
    }

    // Update quantity
    cart.items[itemIndex].quantity += amount;

    if (cart.items[itemIndex].quantity <= 0) {
      cart.items.splice(itemIndex, 1); // Remove item
    }

    await cart.save();

    return NextResponse.json(
      { success: true, message: "Quantity updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Change quantity error:", error.message);
    return NextResponse.json(
      { success: false, message: "Could not update quantity" },
      { status: 500 }
    );
  }
}
