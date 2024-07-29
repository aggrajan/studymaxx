import { z } from 'zod';

export const querySchema = z.object({
    userId: z.string(),
    name: z.string().min(1, "name is required"),
    email: z.string().email({message: 'Invalid Email Address'}).min(1, "email is required"),
    subject: z.string().min(1, "subject is required"),
    message: z.string().min(1, "message is required")
});