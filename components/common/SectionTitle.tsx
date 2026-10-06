import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const SectionTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
    return (
        <h2 className={cn("text-3xl font-bold leading-relaxed text-gray-900", className)}>
            {children}
        </h2>
    );
};

export default SectionTitle
