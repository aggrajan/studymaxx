import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { id, title, authors, binding, board, category, exam, image, isbn, keywords, language, level, number_of_pages, price, discount, size, subject, year } = reqBody;
        const updatedBook = await BookModel.findByIdAndUpdate(id, {
            title, authors, binding, board, category, exam, image, isbn, keywords, language, level, number_of_pages, price, discount, size, subject, year
        }, { new: true });

        console.log(updatedBook);

        return NextResponse.json({
            success: true,
            message: "book has been added successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log("api error: ", error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while adding book"
        }, 
        {
            status: 500
        })
    }
}