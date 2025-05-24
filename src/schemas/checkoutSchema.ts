import { z } from "zod";
import { addressSchema } from "./editProfileSchema";

export const checkoutSchema = z.object({
    userId: z.string().optional(),
    products: z.any(),
    address: addressSchema,
    total: z.number().min(0, "Invalid total amount"),
    discount: z.number().min(0, "Invalid discount amount"),
    shipping: z.number().min(0, "Invalid shipping amount"),
    subtotal: z.number().min(0, "Invalid subtotal amount"),
    numberOfItems: z.number().min(0, "Invalid number of items"),
    name: z.string().min(1, "name is required"),
    email: z.string().email({message: 'Invalid Email Address'}),
    orderStatus: z.string().min(1, "order status is required"),
    coupons: z.string().array()
})