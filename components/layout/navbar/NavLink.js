"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

const NavLink = ({ name = "", link = "", isActive = false }) => {
  const playClick = () => {
    setClicked(true)
    const audio = new Audio('/assets/sounds/click.mp3')
    audio.play()
  }

  return (
    <Link
      href={link}
      className={cn(
        "mx-4 my-2 font-medium hover:underline underline-offset-4 decoration-2",
        isActive ? "text-rose-800" : "",
      )}
    >
      {name}
    </Link>
  )
}

export default NavLink
