'use client'

import { logout } from "@/actions/auth/logout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"


export const LogoutButton = () => {
    const router = useRouter()
    const logoutHandler = async () => {
        await logout()
        router.push('/login')
    }
    return (
        <Button 
            variant="destructive"
            onClick={logoutHandler}
        >
            Logout
        </Button>
    )
}