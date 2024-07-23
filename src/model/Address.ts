import { Schema, Document } from "mongoose";

export interface Address {
    address: string;
    pincode: number;
    city: string;
    state: string;
    landmark?: string;
    contact: number;
}

const AddressSchema: Schema<Address> = new Schema({
    address: {
        type: String,
        required: [true, "address is required"],
        trim: true
    },
    pincode: {
        type: Number,
        required: [true, "pincode is required"]
    },
    city: {
        type: String,
        required: [true, "city is required"],
        trim: true
    },
    state: {
        type: String,
        required: [true, "state is required"]
    },
    landmark: {
        type: String,
        required: false
    },
    contact: {
        type: Number,
        required: [true, "contact number is required"]
    }
});

export default AddressSchema;