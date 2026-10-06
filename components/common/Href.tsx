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
                className={cn("text-white bg-black hover:brightness-90 font-medium rounded-lg text-base px-5 py-2.5 text-center", className)}
            >
                {children}
            </Link>
        )
    } else {
        return (
            <Link
                {...rest}
                className={cn("text-white bg-black hover:brightness-90 font-medium rounded-lg text-base px-5 py-2.5 text-center", className)}
            >
                {children}
            </Link>
        )
    }
}

export default Href
