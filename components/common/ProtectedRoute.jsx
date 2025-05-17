'use client'

import useAuth from "@/hooks/useAuth"
import { useEffect } from "react"

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth()

    useEffect(() => {
        if (!user) {
            window.location.href = "/signin"
        }
    }, [user])

    if (user) {
        return children
    }

    return null
}

export default ProtectedRoute