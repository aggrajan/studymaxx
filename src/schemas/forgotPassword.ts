import {z} from "zod";
import { usernameValidation } from "./signUpSchema";

export const forgotPasswordSchema = z.object({
    email:z.string().email({message: 'Invalid Email Addrese'}),
    username: usernameValidation
})