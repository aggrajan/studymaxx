import mongoose, { Schema, Document } from "mongoose";
import AddressSchema, { Address } from "./Address";


export interface Order extends Document {
    _id?: string;
    user?: mongoose.Types.ObjectId;
    products: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
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
    coupons?: {
        coupon: mongoose.Types.ObjectId
    }[];
}

export const OrderSchema: Schema<Order> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
     products: [{
        product: { type: Schema.Types.ObjectId, ref: "Book", required: true },
        quantity: { type: Number, required: true }
    }],
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
    coupons: [{
      coupon: {
        type: Schema.Types.ObjectId,
        ref: "Coupon"
      }
    }]
},  { timestamps: true })

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);
export default OrderModel;