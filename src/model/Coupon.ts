import mongoose, { Schema, Document } from "mongoose";
import { couponTypes } from "./Enums";

const couponTypesWithEmpty: [string, ...string[]] = ['' as const, ...couponTypes];

export interface Coupon extends Document {
    couponName: string;
    lastValidityDate?: Date;
    couponDescription: string;
    couponType: string;
    couponValue: number;
    minimumAmount: number;
};

export const CouponSchema: Schema<Coupon> = new Schema({
    couponName: {
        type: String,
        required: [true, "Coupon Name is required"]
    }, 
    lastValidityDate: {
        type: Date,
        required: false
    },
    couponDescription: {
        type: String,
        required: [true, "Coupon Description is required"]
    },
    couponType: {
        type: String,
        required: [true, "Coupon Type is required"],
        enum: couponTypesWithEmpty
    },
    couponValue: {
        type: Number,
        required: [true, "Coupon Value is required"]
    },
    minimumAmount: {
        type: Number,
        required: [true, "Minimum Amount is required"]
    }
});

const CouponModel = (mongoose.models.Coupon as mongoose.Model<Coupon>) || (mongoose.model<Coupon>("Coupon", CouponSchema))
export default CouponModel;