import { z } from "zod";
import { couponTypes } from "@/model/Enums";

const couponTypesWithEmpty: [string, ...string[]] = ['' as const, ...couponTypes];

export const editCouponSchema = z.object({
    id: z.string().min(1, "id is required"),
    couponName: z.string().min(1, "Name is required"),
    lastValidityDate: z.date()
        .refine(date => date > new Date(), { // Ensures the date is in the future
            message: "The last validity date must be in the future"
        })
        .optional(), // The date is optional
    couponDescription: z.string().min(1, "Description is required"),
    couponType: z.enum(couponTypesWithEmpty),
    couponValue: z.number().min(0),
    minimumAmount: z.number().min(0)
});