import mongoose, { Schema, Document } from "mongoose";
import AddressSchema, { Address } from "./Address";

export interface User extends Document {
    username?: string;
    name?: string;
    picture?: string;
    email: string;
    password?: string;
    verifyCode?: string;
    verifyCodeExpiry?: Date;
    isVerified: boolean;
    isAdmin?: boolean;
    forgotPasswordCode?: string;
    forgotPasswordCodeExpiry?: Date;
    addresses?: Address[];
};

export const UserSchema: Schema<User> = new Schema({
    username: { 
        type: String,
        required: false,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: false,
    },
    verifyCode: {
        type: String,
        required: false
    },
    verifyCodeExpiry: {
        type: Date,
        required: false
    },
    isVerified: {
        type: Boolean,
        required: false,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordCode: {
        type: String,
        required: false
    },
    forgotPasswordCodeExpiry: {
        type: Date,
        required: false
    },
    name: {
        type: String,
        required: false
    }, 
    picture: {
        type: String,
        required: false
    },
    addresses: [AddressSchema]
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;