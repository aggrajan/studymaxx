import mongoose, { Schema, Document, mongo } from "mongoose";
import { CartItem, CartItemSchema } from "./Cart";
import AddressSchema, { Address } from "./Address";

export interface CouponItem extends Document {
    coupon: mongoose.Types.ObjectId
}

export interface Order extends Document {
    _id?: string;
    user?: mongoose.Types.ObjectId;
    products: CartItem[];
    address: Address;
    total: number;
    discount: number;
    shipping: number;
    subtotal: number;
    numberOfItems: number;
    orderStatus: string;
    name: string;
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
    coupons?: CouponItem[]
}

export const CouponItemSchema: Schema<CouponItem> = new Schema({
    coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon",
        required: false
    }
}, { _id: false } );

export const OrderSchema: Schema<Order> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    products: {
        type: [CartItemSchema],
        required: [true, "products array is required"]
    },
    address: {
        type: AddressSchema,
        required: [true, "address is required"]
    },
    total: {
        type: Number,
        required: [true, "total is required"]
    },
    discount: {
        type: Number,
        required: [true, "discount is required"]
    },
    shipping: {
        type: Number,
        required: [true, "shipping is required"]
    },
    subtotal: {
        type: Number,
        required: [true, "subtotal is required"]
    },
    numberOfItems: {
        type: Number,
        required: [true, "number of items is required"]
    },
    orderStatus: {
        type: String,
        required: [true, "order status is reqiured"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    coupons: {
        type: [CouponItemSchema],
        default: []
    }
},  { timestamps: true })

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);
export default OrderModel;