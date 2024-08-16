import {z} from "zod";
import { usernameValidation } from "./signUpSchema";

const tenDigitNumberSchema = z.number().refine((val) => {
    return Number.isInteger(val) && val.toString().length === 10;
}, {
  message: "The contact must be a valid 10-digit number",
});

export const addressSchema = z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "city is required"),
    state: z.string().min(1, "state is required"),
    pincode: z.number().min(100000, "Please use a six digit pincode").max(999999, "Please use a six digit pincode"),
    landmark: z.string().optional(),
    contact: tenDigitNumberSchema,
    default: z.boolean().default(false),
    name: z.string().min(1, "name is required"),
    company: z.string().optional()
});

export const profileSchema = z.object({
    name: z.string().optional(),
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    addresses: addressSchema.array(),
    picture: z.string().optional(),
});