import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import BooksModel from "@/model/Books";
import CartModel from "@/model/Cart";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();

    const { bookId } = await request.json();

    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return NextResponse.json(
        { success: false, message: "Invalid book ID" },
        { status: 400 }
      );
    }

    const userIdResponse = await getDataFromToken(request);
    const userId = userIdResponse.response;

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

    let cart = await CartModel.findOne({ user: userId });

    if (!cart) {
      // Create new cart
      cart = new CartModel({
        user: userId,
        items: [{ product: bookId, quantity: 1 }],
      });

      await cart.save();
      return NextResponse.json(
        { success: true, message: "Book added to cart (new cart created)" },
        { status: 201 }
      );
    }

    const existingItem = cart.items.find((item) =>
      item.product.equals(bookId)
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: bookId, quantity: 1 });
    }

    await cart.save();

    return NextResponse.json(
      { success: true, message: "Book added to cart successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Add-to-cart error:", error.message);
    return NextResponse.json(
      { success: false, message: "Error adding book to cart" },
      { status: 500 }
    );
  }
}
