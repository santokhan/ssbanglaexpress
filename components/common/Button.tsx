import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; className?: string; children?: ReactNode };

const Button = ({ variant = "", className = "", children, ...rest }: ButtonProps) => {
    if (variant) {
        return (
            <button
                {...rest}
                className={cn("inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] disabled:opacity-60", className)}
            >
                {children}
            </button>
        )
    } else {
        return (
            <button
                {...rest}
                className={cn("inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] disabled:opacity-60", className)}
            >
                {children}
            </button>
        )
    }
}

export default Button
