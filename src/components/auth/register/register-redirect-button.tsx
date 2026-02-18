'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export const RegisterRedirectButton = () => {
    const router = useRouter()
    return (
        <Button
            onClick={() => router.push('/register')}
        >
            Register
        </Button>
    )
}
