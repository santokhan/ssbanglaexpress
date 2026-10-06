"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

type NavLinkProps = { name?: string; link?: string; isActive?: boolean };

const NavLink = ({ name = "", link = "", isActive = false }: NavLinkProps) => {
  return (
    <Link
      href={link}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative mx-1 my-1 inline-flex items-center rounded-full px-4 py-2 text-[15px] font-semibold tracking-[0.01em] text-slate-700 transition-colors duration-200 hover:bg-rose-50 hover:text-[#a3163c] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-2",
        isActive && "bg-rose-50 text-[#a3163c]",
        "lg:my-0",
      )}
    >
      {name}
    </Link>
  )
}

export default NavLink
