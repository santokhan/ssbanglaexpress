'use client'

import { useEffect, useState, type ReactNode } from "react"
import AuthContext from "./AuthContext"
import type { AuthUser } from "./AuthContext"

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null)

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch('/api/auth/me')
            const user = (await response.json()) as AuthUser
            setUser(user)
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider
