import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth/auth";
import { prisma } from "../prisma";

export const getCurrentUser = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    
    const verifiedToken = await verifyJWT(token)
    if(!verifiedToken) return null

    const user = await prisma.user.findUnique({
        where: {
            id: verifiedToken.userId
        }
    })

    return user
}