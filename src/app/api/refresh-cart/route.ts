import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import BooksModel from "@/model/Books";
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

        const users = await UserModel.find({ "cart.product._id": bookId });
        if (users.length === 0) {
            return NextResponse.json({
                success: true,
                message: "No users found with the book in their cart"
            }, {
                status: 201
            });
        }
        // edit user's cart

        for (const user of users) {
            user.cart = user.cart.map((cartItem: CartItem) => {
                if (cartItem.product.id.toString() === bookId) {
                    cartItem.product.title = updatedBook.title;
                    cartItem.product.image = updatedBook.image;
                    cartItem.product.price = updatedBook.price;
                    cartItem.product.discount = updatedBook.discount;
                    cartItem.product.authors = updatedBook.authors;
                    cartItem.product.level = updatedBook.level;
                    cartItem.product.subject = updatedBook.subject;
                    cartItem.product.board = updatedBook.board;
                    cartItem.product.exam = updatedBook.exam;
                    cartItem.product.keywords = updatedBook.keywords;
                    cartItem.product.language = updatedBook.language;
                    cartItem.product.isbn = updatedBook.isbn;
                    cartItem.product.number_of_pages = updatedBook.number_of_pages;
                    cartItem.product.year = updatedBook.year;
                    cartItem.product.size = updatedBook.size;
                    cartItem.product.binding = updatedBook.binding;
                    cartItem.product.category = updatedBook.category;
                    cartItem.product.about = updatedBook.about;
                    cartItem.product.salient_features = updatedBook.salient_features;
                    cartItem.product.useful_for = updatedBook.useful_for;
                    cartItem.product.additional_support = updatedBook.additional_support;
                    cartItem.product.latest = updatedBook.latest;
                    cartItem.product.pdfUrl = updatedBook.pdfUrl;
                    cartItem.product.outOfStock = updatedBook.outOfStock;
                    cartItem.product.previewImages = updatedBook.previewImages;
                }
                return cartItem;
            });
            await user.save();
        }

        return NextResponse.json({
            success: true,
            message: "Book details updated in users' carts"
        }, {
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: 500
        });
    }
}