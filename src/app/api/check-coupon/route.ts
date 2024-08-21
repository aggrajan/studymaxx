import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import CouponModel from "@/model/Coupon";
import {z} from "zod";
import { NextRequest, NextResponse } from "next/server";
import { couponTypes } from "@/model/Enums";

const couponTypesWithEmpty: [string, ...string[]] = ['' as const, ...couponTypes];

const CouponQuerySchema = z.object({
    couponName: z.string().min(1, "Name is required"),
    lastValidityDate: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date().refine(date => date > new Date(), {
            message: "The last validity date must be in the future",
        }).optional()
    ),
    couponDescription: z.string().min(1, "Description is required"),
    couponType: z.enum(couponTypesWithEmpty),
    couponValue: z.number().min(0),
    minimumAmount: z.number().min(0),
    cartAmount: z.number().min(0),
    currentDate: z.preprocess(
        (arg) => (typeof arg === "string" ? new Date(arg) : arg),
        z.date()
    ),
});

export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { couponName, lastValidityDate, couponDescription, couponType, couponValue, minimumAmount, cartAmount, currentDate } = reqBody;


        const coupon = { couponName, lastValidityDate, couponDescription, couponType, couponValue, minimumAmount, cartAmount, currentDate };
        const couponFound = await CouponModel.find({ couponName: couponName });
        if(!couponFound) {
            return NextResponse.json({
                success: false,
                message: "Coupon not found"
            }, {
                status: 404
            })
        }

        const result = CouponQuerySchema.safeParse(coupon);
        if(!result.success) {
            return NextResponse.json({
                success: false,
                message: "Invalid Coupon"
            }, {
                status: 403
            })
        }

        if(cartAmount < minimumAmount) {
            return NextResponse.json({
                success: false,
                message: `Your cart amount should be atleast ${minimumAmount} rupeess inorder to avail this coupon`
            }, {
                status: 402
            })
        }

        if(currentDate > lastValidityDate) {
            return NextResponse.json({
                success: false,
                message: `This coupon is expired`
            }, {
                status: 401
            })
        }

        return NextResponse.json({
            success: true,
            message: "Coupon is available"
        }, {
            status: 200
        })
    } catch(error: any) {
        console.error("Error checking coupon ", error);
        return NextResponse.json({
            success: false,
            message: "Error checking coupon"
        }, {
            status: 500
        })
    }
}