import { cn } from "@/lib/utils";

const SectionTitle = ({ children, className = "" }) => {
    return (
        <h2 className={cn("text-3xl font-bold leading-relaxed text-gray-900", className)}>
            {children}
        </h2>
    );
};

export default SectionTitle