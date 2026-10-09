import AuthProvider from "@/contexts/AuthProvider";
import PublicRoute from "@/components/common/PublicRoute";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <PublicRoute>{children}</PublicRoute>
        </AuthProvider>
    );
}
