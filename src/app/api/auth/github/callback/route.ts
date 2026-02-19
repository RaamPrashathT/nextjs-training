import { cookies } from "next/headers";
import type { OAuth2Tokens } from "arctic";
import { github } from "@/lib/oauth";
import { getUserByEmail, getUserForOAuthUsingId } from "@/data/user";
import { prisma } from "@/lib/prisma";
import { createJWT } from "@/lib/auth/auth";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    const cookieStore = await cookies();
    const storedState = cookieStore.get("github_oauth_state")?.value ?? null;
    if (code === null || state === null || storedState === null) {
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
        tokens = await github.validateAuthorizationCode(code);
    } catch (e) {
        console.error(e);
        return new Response(null, {
            status: 400,
        });
    }

    const githubUserResponse = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    });
    if (!githubUserResponse.ok) {
        return new Response(null, { status: 400 });
    }

    const githubUser = await githubUserResponse.json();
    const githubUserId = githubUser.id.toString();
    const githubUsername = githubUser.login;

    const existingGithubUser = await getUserForOAuthUsingId(
        githubUserId,
        "github",
    );

    const emailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            Authorization: `Bearer ${tokens.accessToken()}`,
        },
    });
    if (!emailResponse.ok) {
        console.error(await emailResponse.text());
        return new Response(null, { status: 400 });
    }
    const emails = await emailResponse.json();
    
    const primaryEmail = emails.find(
        (e: any) => e.primary && e.verified,
    )?.email;

    if (!primaryEmail) {
        return new Response(null, { status: 400 });
    }

    const existingUser = await getUserByEmail(primaryEmail);

    let user;
    try {
        if (existingGithubUser) {
            user = existingGithubUser.user;
        } else {
            if (existingUser) {
                await prisma.account.create({
                    data: {
                        provider: "github",
                        providerAccountID: githubUserId,
                        userId: existingUser.id,
                    },
                });
                user = existingUser;
            } else {
                user = await prisma.user.create({
                    data: {
                        username: githubUsername ?? primaryEmail.split("@")[0],
                        email: primaryEmail,
                        emailVerified: true,
                        accounts: {
                            create: {
                                provider: "github",
                                providerAccountID: githubUserId,
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
        cookieStore.delete("github_oauth_state");
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
