import Link from "next/link"
import type { ComponentProps, ReactNode } from "react"
import { cn } from "@/lib/utils"

type HrefProps = Omit<ComponentProps<typeof Link>, "className"> & {
    variant?: string;
    className?: string;
    children: ReactNode;
};

const Href = ({ variant = "", className = "", children, ...rest }: HrefProps) => {
    if (variant) {
        return (
            <Link
                {...rest}
                className={cn("inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]", className)}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <Link
                {...rest}
                className={cn("inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]", className)}
            >
                {children}
            </Link>
        )
    }
}

export default Href
