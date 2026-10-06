'use client'

import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"
import type { ReactNode } from "react"

const PublicRoute = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()

    useEffect(() => {
        if (user) {
            window.location.href = "/"
        }
    }, [user])

    if (!user) {
        return children
    }

    return null
}

export default PublicRoute
