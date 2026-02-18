"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleOAuthButton = () => {

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => {
                globalThis.location.href = "/api/auth/google";
            }}
        >
            <FcGoogle />
            Continue with Google
        </Button>
    );
};
