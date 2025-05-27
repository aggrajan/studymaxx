import { z } from "zod";

export const QRFormSchema = z.object({
    code: z.string().min(1, "code is required"),
    url: z.string().url({ message: "Please enter a valid url" })
});