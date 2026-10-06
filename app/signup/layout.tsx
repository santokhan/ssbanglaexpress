import AuthProvider from "@/contexts/AuthProvider"
import PublicRoute from "@/components/common/PublicRoute"
import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <PublicRoute>
                {children}
            </PublicRoute>
        </AuthProvider>
    )
}

export default Layout
