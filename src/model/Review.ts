import mongoose, { Schema, Document } from "mongoose";

export interface Review extends Document {
    user: mongoose.Types.ObjectId;
    book: mongoose.Types.ObjectId;
    review: string;
    rating: number;
}

export const ReviewSchema: Schema<Review> = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "userId is required"]
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: "Book",
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
    }

}, { timestamps: true });

const ReviewModel = (mongoose.models.Review as mongoose.Model<Review>) || mongoose.model<Review>("Review", ReviewSchema);
export default ReviewModel;