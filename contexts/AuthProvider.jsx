'use client'

import { useEffect, useState } from "react"
import AuthContext from "./AuthContext"

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        async function fetchUser() {
            const response = await fetch('/api/auth/me')
            const user = await response.json()
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