import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel, { CartItem } from "@/model/User";
import BookModel, { Book } from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const dataResponse = await getDataFromToken(request);
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
        const { id } = reqBody;
        await BookModel.findByIdAndDelete(id);

        const cartUsers = await UserModel.find({ "cart.product._id": id });

        for (const user of cartUsers) {
            user.cart = user.cart.filter((cartItem: CartItem) => {
                if (cartItem.product.id.toString() !== id) {
                    return true;
                }
                return false;
            });
            await user.save();
        }

        const wishlistUsers = await UserModel.find({ "wishlist._id": id });

        for (const user of wishlistUsers) {
            user.wishlist = user.wishlist.filter((book: Book) => {
                if (book.id.toString() !== id) {
                    return true;
                }
                return false;
            });
            await user.save();
        }

        return NextResponse.json({
            success: true,
            message: "book has been deleted successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while deleting book"
        }, 
        {
            status: 500
        })
    }
}