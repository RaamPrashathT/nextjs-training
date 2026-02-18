import { google } from "@/lib/oauth";
import * as arctic from "arctic";
import { cookies } from "next/headers";

export async function GET() {
    const state = arctic.generateState();
    const codeVerifier = arctic.generateCodeVerifier();
    const scopes = ["openid", "profile", "email"];
    const url = google.createAuthorizationURL(state, codeVerifier, scopes);

    const cookieStore = await cookies();

    cookieStore.set("google_oauth_state", state, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10,
        sameSite: "lax",
    });

    cookieStore.set("google_oauth_code_verifier", codeVerifier, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 10, 
        sameSite: "lax",
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString(),
        },
    })
}
