import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import BooksModel, { Book } from "@/model/Books";
import UserModel, { CartItem } from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();

        const dataResponse = await getDataFromToken(request)
        const userId = dataResponse.response;

        const user = await UserModel.findById(userId);
        if(!user || !user.isVerified || !user.isAdmin) {
            return NextResponse.json({
                success: false,
                message: "Invalid User"
            }, {
                status: 404
            });
        }
        const reqBody = await request.json();
        const { bookId } = reqBody;
        const updatedBook = await BooksModel.findById(bookId);
        if (!updatedBook) {
            return NextResponse.json({
                success: false,
                message: "Book not found"
            }, {
                status: 404
            });
        }

        const users = await UserModel.find({ "wishlist._id": bookId });
        if (users.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No users found with the book in their wishlist"
            }, {
                status: 201
            });
        }
        // edit user's cart

        for (const user of users) {
            user.wishlist = user.wishlist.map((book: Book) => {
                if (book.id.toString() === bookId) {
                    return updatedBook;
                }
                return book;
            });
            await user.save();
        }

        return NextResponse.json({
            success: true,
            message: "Book details updated in users' wishlist"
        }, {
            status: 200
        });

    } catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: 500
        });
    }
}