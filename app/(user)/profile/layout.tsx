import AuthProvider from "@/contexts/AuthProvider"
import ProtectedRoute from "@/components/common/ProtectedRoute"
import type { ReactNode } from "react"

export default function ProfileLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
        </AuthProvider>
    )
}
