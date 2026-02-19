"use client";

import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export const GithubOAuthButton = () => {

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => {
                globalThis.location.href = "/api/auth/github";
            }}
        >
            <FaGithub />
            Continue with Github
        </Button>
    );
};
