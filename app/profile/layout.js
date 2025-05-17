import AuthProvider from "@/contexts/AuthProvider"
import ProtectedRoute from "@/components/common/ProtectedRoute"

const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </AuthProvider>
    )
}

export default Layout