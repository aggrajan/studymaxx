import mongoose, { Schema, Document } from "mongoose";

export interface Query extends Document {
    user?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const QuerySchema: Schema<Query> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    subject: {
        type: String,
        required: [true, "subject is required"]
    },
    message: {
        type: String,
        required: [true, "message is required"]
    }
},  { timestamps: true });

const QueryModel = (mongoose.models.Query as mongoose.Model<Query>) || mongoose.model<Query>("Query", QuerySchema);

export default QueryModel;