import mongoose, { Schema, Document } from "mongoose";

export interface Review extends Document {
    userId: string;
    bookId: string;
    review: string;
    rating: number;
    image?: string;
    name?: string;
    username?: string;
}

export const ReviewSchema: Schema<Review> = new Schema({
    userId: {
        type: String,
        required: [true, "userId is required"]
    },
    bookId: {
        type: String,
        required: [true, "bookId is required"]
    },
    review: {
        type: String,
        required: [true, "review is required"]
    },
    rating: {
        type: Number,
        required: [true, "rating is required"],
        min: 1,
        max: 5
    }, 
    image: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false
    }

}, { timestamps: true });

const ReviewModel = (mongoose.models.Review as mongoose.Model<Review>) || mongoose.model<Review>("Review", ReviewSchema);
export default ReviewModel;