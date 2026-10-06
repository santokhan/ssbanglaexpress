import AuthProvider from "@/contexts/AuthProvider"
import ProtectedRoute from "@/components/common/ProtectedRoute"
import type { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <AuthProvider>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </AuthProvider>
    )
}

export default Layout
