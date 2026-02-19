import { github } from "@/lib/oauth";
import * as arctic from "arctic";
import { cookies } from "next/headers";

export async function GET() {
    const state = arctic.generateState();
    const url = github.createAuthorizationURL(state, [
        "read:user",
        "user:email",
    ]);

    const cookieStore = await cookies();

    cookieStore.set("github_oauth_state", state, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString(),
        },
    });
}
