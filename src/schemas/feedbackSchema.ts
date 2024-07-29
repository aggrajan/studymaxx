import { z } from 'zod';

export const feedbackSchema = z.object({
    userId: z.string(),
    name: z.string().min(1, "name is required"),
    email: z.string().email({message: 'Invalid Email Address'}),
    book: z.string().optional(),
    feedback: z.string().min(1, "feedback is required")
});