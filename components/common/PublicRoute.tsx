'use client'

import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user, isLoading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!isLoading && user) router.replace("/")
    }, [isLoading, user, router])

    return !isLoading && !user ? children : null
}

export default PublicRoute
