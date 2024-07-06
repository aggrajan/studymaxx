import { ApiResponse } from "@/types/ApiResponse";
import { NextRequest } from "next/server";
import jwt from  "jsonwebtoken";

export async function getDataFromToken (request: NextRequest): Promise<ApiResponse> {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return {
            success: true,
            response: decodedToken.id
        }
    } catch(error: any) {
        return {
            success: false,
            message: error.message
        }
    }
}