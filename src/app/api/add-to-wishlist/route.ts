import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import WishlistModel from "@/model/Wishlist";
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
    if (!book) {
      return NextResponse.json(
        {
          success: false,
          message: "Book not found",
        },
        { status: 404 }
      );
    }

    let wishlist = await WishlistModel.findOne({ user: userId });

    // Create a new wishlist if none exists
    if (!wishlist) {
      wishlist = new WishlistModel({
        user: userId,
        items: [{ product: bookId }],
      });
    } else {
      // Check if book already in wishlist
      const alreadyExists = wishlist.items.some((item) =>
        item.product.equals(bookId)
      );

      if (alreadyExists) {
        return NextResponse.json(
          {
            success: false,
            message: "Book already in wishlist",
          },
          { status: 409 }
        );
      }

      // Add book to wishlist
      wishlist.items.push({ product: bookId });
    }

    await wishlist.save();

    return NextResponse.json(
      {
        success: true,
        message: "Book successfully added to wishlist",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error adding to wishlist:", error.message);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add book to wishlist",
      },
      { status: 500 }
    );
  }
}
