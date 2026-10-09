'use client'

import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && !user) router.replace("/auth/signin")
    }, [isLoading, user, router])

    if (isLoading || !user) {
        return <div aria-busy="true" className="min-h-[var(--height-main)] bg-[#f7f8fa]" />
    }

    return children
}

export default ProtectedRoute
