import mongoose, { Schema, Document } from "mongoose";

export interface Feedback extends Document {
    userId: string,
    name: string,
    email: string,
    book?: string,
    feedback: string
}

export const FeedbackSchema: Schema<Feedback> = new Schema({
    userId: {
        type: String,
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