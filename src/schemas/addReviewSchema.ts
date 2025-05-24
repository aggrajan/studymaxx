import {z} from 'zod';

export const reviewSchema = z.object({
    userId: z.string().min(1, "userId is required"),
    bookId: z.string().min(1, "bookId is required"),
    review: z.string().min(1, "review is required"),
    rating: z.number().min(1, "Please choose a rating").max(5, "Please choose a rating")
});