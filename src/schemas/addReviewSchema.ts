import {z} from 'zod';

export const reviewSchema = z.object({
    userId: z.string().min(1, "userId is required"),
    bookId: z.string().min(1, "bookId is required"),
    review: z.string().min(1, "review is required"),
    rating: z.number().min(1).max(5),
    image: z.string().optional(),
    name: z.string().optional(),
    username: z.string().optional()
});