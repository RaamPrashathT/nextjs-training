"use server";

import { getUserWithPasswordByEmail } from "@/data/user";
import { createJWT } from "@/lib/auth";
import { cookies } from "next/headers";
import { loginSchema } from "@/schema";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const login = async (request: z.infer<typeof loginSchema>) => {
    const validatedRequest = loginSchema.safeParse(request);

    if (!validatedRequest.success) {
        return {
            status: 400,
            success: false,
            message: "Parsing Error",
        };
    }

    const existingUser = await getUserWithPasswordByEmail(
        validatedRequest.data.email,
    );


    if (existingUser?.provider !== "credentials" || !existingUser?.password) {
        return {
            status: 400,
            success: false,
            message: "Invalid email or password",
        };
    }

    const isPasswordCorrect = await bcrypt.compare(
        validatedRequest.data.password,
        existingUser.password,
    );

    if (!isPasswordCorrect) {
        return {
            status: 400,
            success: false,
            message: "Invalid email or password",
        };
    }

    try {
        const token = await createJWT({
            userId: existingUser.userId,
            email: existingUser.providerAccountID,
        });

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });

        return {
            status: 200,
            success: true,
            message: "Logged in successfully",
        };
    } catch {
        return {
            status: 500,
            success: false,
            message: "Something went wrong",
        };
    }
};
