"use server"

import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";
import generateName from "@/lib/randomNameGenerator";
import { registerSchema } from "@/schema";
import bcrypt from "bcryptjs"
import * as z from "zod";

export const register = async (request: z.infer<typeof registerSchema>) => {
    const validatedRequest = registerSchema.safeParse(request);

    if(!validatedRequest.success) {
        return {
            status: 400,
            success: false,
            message: "Parsing Error"
        }
    }

    const existingUser = await getUserByEmail(validatedRequest.data.email);
    

    if(existingUser) {
        return {
            status: 400,
            success: false,
            message: "User already exists"
        }
    }

    const hashedPassword = await bcrypt.hash(validatedRequest.data.password, 17);
    const randomName=  generateName();

    try {
        await prisma.user.create({
            data: {
                username: randomName,
                email: request.email,
                accounts: {
                    create: {
                        provider: "credentials",
                        providerAccountID: request.email,
                        password: hashedPassword
                    }
                }
            }
        })
        return {
            status: 200,
            success: true,
            message: "User created successfully"
        }
    } catch (error) {
        return {
            status: 500,
            success: false,
            message: "Something went wrong: " + error
        }
    }

};
