'use client'

import { useEffect, useState, type ReactNode } from "react"
import { usePathname } from "next/navigation"
import AuthContext from "./AuthContext"
import type { AuthUser } from "./AuthContext"
import { getCurrentUserAction } from "@/actions/auth/session"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname()
    const [user, setUser] = useState<AuthUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let active = true
        setIsLoading(true)
        void getCurrentUserAction()
            .then((currentUser) => {
                if (active) setUser(currentUser as AuthUser | null)
            })
            .catch(() => {
                if (active) setUser(null)
            })
            .finally(() => {
                if (active) setIsLoading(false)
            })
        return () => { active = false }
    }, [pathname])

    return (
        <AuthContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
