import AuthProvider from "@/contexts/AuthProvider"
import PublicRoute from "@/components/common/PublicRoute"

const Layout = ({ children }) => {
    return (
        <AuthProvider>
            <PublicRoute>
                {children}
            </PublicRoute>
        </AuthProvider>
    )
}

export default Layout