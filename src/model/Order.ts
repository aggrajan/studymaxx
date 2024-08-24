import mongoose, { Schema, Document, mongo } from "mongoose";
import { CartItem, CartItemSchema } from "./User";
import AddressSchema, { Address } from "./Address";
export interface Order extends Document {
    _id?: string;
    userId?: string;
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
}

export const OrderSchema: Schema<Order> = new Schema({
    userId: {
        type: String,
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
    }
},  { timestamps: true })

const OrderModel = (mongoose.models.Order as mongoose.Model<Order>) || mongoose.model<Order>("Order", OrderSchema);
export default OrderModel;