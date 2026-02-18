import { tokenSchema } from "@/schema";
import { SignJWT, jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createJWT(payload: { userId: string; email: string }) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(secret);
}

export async function verifyJWT(token: string) {
    try {
        const { payload } = await jwtVerify(token, secret);

        const parsed = tokenSchema.safeParse(payload);
        if (!parsed.success) return null;

        return parsed.data;
    } catch {
        return null;
    }
}