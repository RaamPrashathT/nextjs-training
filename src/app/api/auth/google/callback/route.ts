import { cookies } from "next/headers";
import type { OAuth2Tokens } from "arctic";
import { google } from "@/lib/oauth";
import { decodeIdToken } from "arctic";
import { OAuthIdTokenSchema } from "@/schema";
import { getUserByEmail, getUserForOAuthUsingId } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { createJWT } from "@/lib/auth/auth";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = await cookies();
    const storedState = cookieStore.get("google_oauth_state")?.value ?? null;
    const storedCodeVerifier =
        cookieStore.get("google_oauth_code_verifier")?.value ?? null;

    if (
        code === null ||
        state === null ||
        storedState === null ||
        storedCodeVerifier === null
    ) {
        return new Response(null, {
            status: 400,
        });
    }

    if (state !== storedState) {
        return new Response(null, {
            status: 400,
        });
    }

    let tokens: OAuth2Tokens;

    try {
        tokens = await google.validateAuthorizationCode(
            code,
            storedCodeVerifier,
        );
    } catch (e) {
        console.error(e);
        return new Response(null, {
            status: 400,
        });
    }
    const idToken = tokens.idToken();
    if (!idToken) {
        return new Response(null, { status: 400 });
    }

    const claims = decodeIdToken(idToken);
    const validatedClaims = OAuthIdTokenSchema.safeParse(claims);

    if (!validatedClaims.success || !validatedClaims.data.email_verified) {
        return new Response(null, {
            status: 400,
        });
    }

    const googleUserId = validatedClaims.data.sub;
    const email = validatedClaims.data.email;
    const name = validatedClaims.data.name;

    const existingGoogleUser = await getUserForOAuthUsingId(
        googleUserId,
        "google",
    );
    const existingUser = await getUserByEmail(email);

    let user;
    try {
        if (existingGoogleUser) {
            user = existingGoogleUser.user;
        } else {
            if (existingUser) {
                await prisma.account.create({
                    data: {
                        provider: "google",
                        providerAccountID: googleUserId,
                        userId: existingUser.id,
                    },
                });
                user = existingUser;
            } else {
                user = await prisma.user.create({
                    data: {
                        username: name ?? email.split("@")[0],
                        email: email,
                        emailVerified: true,
                        accounts: {
                            create: {
                                provider: "google",
                                providerAccountID: googleUserId,
                            },
                        },
                    },
                });
            }
        }
        const token = await createJWT({
            userId: user.id,
            email: user.email,
        });

        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
        });
        cookieStore.delete("google_oauth_state");
        cookieStore.delete("google_oauth_code_verifier");
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/hooks/UseReducer/Implementation-1",
            },
        });
    } catch (error) {
        console.error(error);
        return new Response(null, { status: 500 });
    }
}
