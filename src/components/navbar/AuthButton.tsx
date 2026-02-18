import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { LoginRedirectButton } from "../auth/login/login-redirect-button";
import { RegisterRedirectButton } from "../auth/register/register-redirect-button";
import { LogoutButton } from "../auth/logoutButton";

export const AuthButton = async () => {
    const user = await getCurrentUser();

    return (
        <div>
            {user ? (
                <div>
                    <LogoutButton />
                </div>
            ) : (
                <div className="flex gap-x-2">
                    <LoginRedirectButton />
                    <RegisterRedirectButton />
                </div>
            )}
        </div>
    );
};
