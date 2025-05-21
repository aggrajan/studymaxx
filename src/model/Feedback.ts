import mongoose, { Schema, Document } from "mongoose";

export interface Feedback extends Document {
    user: mongoose.Types.ObjectId,
    name: string,
    email: string,
    book?: string,
    feedback: string
}

export const FeedbackSchema: Schema<Feedback> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    book: {
        type: String,
        required: false
    },
    feedback: {
        type: String,
        required: [true, "feedback is required"]
    }
},  { timestamps: true });

const FeedbackModel = (mongoose.models.Feedback as mongoose.Model<Feedback>) || mongoose.model<Feedback>("Feedback", FeedbackSchema);

export default FeedbackModel;