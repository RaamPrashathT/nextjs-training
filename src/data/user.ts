import { prisma } from "@/lib/prisma"


export const getUserByEmail = async (email: string) => {
    const response = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return response
}