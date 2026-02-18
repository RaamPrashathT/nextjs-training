import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";

export const GoogleOAuthButton = () => {
    return (
        <Button
            variant="outline"
        >
            <FcGoogle />
            Continue with Google
        </Button>
    )
} 