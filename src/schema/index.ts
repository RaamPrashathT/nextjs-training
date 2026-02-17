import * as z from "zod";

export const registerSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(100, "Password is too long"),
});
