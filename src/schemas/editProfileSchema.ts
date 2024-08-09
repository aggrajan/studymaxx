import {z} from "zod";
import { usernameValidation } from "./signUpSchema";

export const addressSchema = z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "city is required"),
    state: z.string().min(1, "state is required"),
    pincode: z.number().min(100000).max(999999),
    landmark: z.string().optional(),
})

export const profileSchema = z.object({
    name: z.string().optional(),
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    addresses: z.array(addressSchema),
    picture: z.string().optional(),
    contact: z.number().min(1000000000).max(9999999999).optional()
});