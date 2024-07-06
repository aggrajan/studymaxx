import {z} from "zod";

export const verifyNewPasswordSchema = z.object({
    token: z.string().length(6, "Verification code must be 6 digits"),
    newPassword: z.string().min(6, "Password must be atleast 6 letters")
})