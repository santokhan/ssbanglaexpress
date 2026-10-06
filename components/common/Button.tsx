import { cn } from "@/lib/utils";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; className?: string; children?: ReactNode };

const Button = ({ variant = "", className = "", children, ...rest }: ButtonProps) => {
    if (variant) {
        return (
            <button
                {...rest}
                className={cn("text-white bg-black hover:brightness-90 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center", className)}
            >
                {children}
            </button>
        )
    } else {
        return (
            <button
                {...rest}
                className={cn("text-white bg-black hover:brightness-90 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center", className)}
            >
                {children}
            </button>
        )
    }
}

export default Button
