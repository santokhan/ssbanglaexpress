import Link from "next/link"

const { cn } = require("@/lib/utils")

const Href = ({ variant = "", className = "", children, ...rest }) => {
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