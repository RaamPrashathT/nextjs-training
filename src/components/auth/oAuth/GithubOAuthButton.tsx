import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";

export const GithubOAuthButton = () => {
    return (
        <Button variant="outline" type="button">
            <FaGithub />
            Continue with GitHub
        </Button>
    );
};
