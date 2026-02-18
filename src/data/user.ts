import { prisma } from "@/lib/prisma"


export const getUserByEmail = async (email: string) => {
    const response = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    return response
}

export const getUserWithPasswordByEmail = async (email: string) => {
    return await prisma.account.findUnique({
        where: {
            provider_providerAccountID: {
                provider: "credentials",
                providerAccountID: email,
            },
        },
        select: {
            userId: true,
            providerAccountID: true,
            provider: true,
            password: true,
        },
    });
};

export const getUserForOAuthUsingId = async (userId: string, provider: string) => {
    return await prisma.account.findUnique({
        where: {
            provider_providerAccountID: {
                provider: provider,
                providerAccountID: userId,
            },
        },include: {
            user: true
        }
    
    })
}