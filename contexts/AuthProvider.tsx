'use client'

import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "./AuthContext"
import type { AuthUser } from "./AuthContext"
import { getCurrentUserAction } from "@/actions/auth/session"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchUser() {
            try {
                const currentUser = await getCurrentUserAction()
                if (!controller.signal.aborted) setUser(currentUser as AuthUser | null)
            } catch {
                if (!controller.signal.aborted) setUser(null)
            } finally {
                if (!controller.signal.aborted) setIsLoading(false)
            }
        }
        void fetchUser()
        return () => controller.abort()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
