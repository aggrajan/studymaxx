import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import BooksModel from "@/model/Books";
import WishlistModel from "@/model/Wishlist";
import { getDataFromToken } from "@/helpers/getDataFromToken";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const reqBody = await request.json();
    const { bookId } = reqBody;

    const userIdResponse = await getDataFromToken(request);
    const userId = userIdResponse.response;

    // Check if the book exists
    const book = await BooksModel.findById(bookId);
    if (!book) {
      return NextResponse.json({
        success: false,
        message: "Book not found",
      }, { status: 404 });
    }

    // Find wishlist for the user
    const wishlist = await WishlistModel.findOne({ user: userId });
    if (!wishlist) {
      return NextResponse.json({
        success: false,
        message: "Wishlist not found for user",
      }, { status: 404 });
    }

    // Check if item exists in wishlist
    const exists = wishlist.items.some(item => item.product.toString() === bookId);
    if (!exists) {
      return NextResponse.json({
        success: false,
        message: "Book is not in wishlist",
      }, { status: 400 });
    }

    // Remove the book from the wishlist
    await WishlistModel.updateOne(
      { user: userId },
      { $pull: { items: { product: bookId } } }
    );

    return NextResponse.json({
      success: true,
      message: "Book successfully removed from wishlist",
    }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: `Failed to remove book: ${error.message}`,
    }, { status: 500 });
  }
}
