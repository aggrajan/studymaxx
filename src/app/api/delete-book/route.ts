import { getDataFromToken } from "@/helpers/getDataFromToken";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";
import CartModel from "@/model/Cart";
import WishlistModel from "@/model/Wishlist";

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

        await CartModel.updateMany(
            { "items.product": id },
            { $pull: { items: { product: id } } }
        );


        await WishlistModel.updateMany(
            { "items.product": id },
            { $pull: { items: { product: id } } }
        );

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