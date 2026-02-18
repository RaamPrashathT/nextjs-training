'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const LoginRedirectButton = () => {
    const router = useRouter()
    return (
        <Button
            onClick={() => router.push('/login')}
        >
            Login
        </Button>
    )
}
