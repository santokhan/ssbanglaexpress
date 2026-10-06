'use client'

import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "./AuthContext"
import type { AuthUser } from "./AuthContext"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const controller = new AbortController()
        async function fetchUser() {
            try {
                const response = await fetch('/api/auth/me', { signal: controller.signal })
                if (!response.ok) {
                    setUser(null)
                    return
                }
                const data: unknown = await response.json()
                if (data && typeof data === "object" && "user" in data) {
                    setUser((data as { user: AuthUser | null }).user)
                } else {
                    setUser(data as AuthUser)
                }
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
