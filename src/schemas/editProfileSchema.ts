import {z} from "zod";
import { usernameValidation } from "./signUpSchema";

const tenDigitNumberSchema = z.number().refine((val) => {
    // Check if the number is an integer and has 10 digits
    return Number.isInteger(val) && val.toString().length === 10;
  }, {
    message: "The contact must be a valid 10-digit number",
  });

export const addressSchema = z.object({
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "city is required"),
    state: z.string().min(1, "state is required"),
    pincode: z.number().min(100000).max(999999),
    landmark: z.string().optional(),
    contact: tenDigitNumberSchema,
    default: z.boolean(),
    name: z.string().min(1, "name is required"),
    company: z.string().optional()
})

export const profileSchema = z.object({
    name: z.string().optional(),
    username: usernameValidation,
    email: z.string().email({message: 'Invalid Email Address'}),
    addresses: z.array(addressSchema),
    picture: z.string().optional(),
});