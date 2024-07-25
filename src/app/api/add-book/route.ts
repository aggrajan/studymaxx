import dbConnect from "@/lib/dbConnect";
import BookModel from "@/model/Books";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { title, authors, binding, board, category, exam, image, isbn, keywords, language, level, number_of_pages, price, discount, size, subject, year } = reqBody;
        const newBook = new BookModel({
            title, authors, binding, board, category, exam, image, isbn, keywords, language, level, number_of_pages, price, size, subject, year, discount
        })

        await newBook.save();

        return NextResponse.json({
            success: true,
            message: "book has been added successfully"
        }, 
        {
            status: 200
        })
    }
    catch (error: any) {
        console.log(error.message);
        return NextResponse.json({
            success: false,
            message: "error occured while adding book"
        }, 
        {
            status: 500
        })
    }
}