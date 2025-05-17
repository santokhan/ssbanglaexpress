'use client'

import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"

const PublicRoute = ({ children }) => {
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