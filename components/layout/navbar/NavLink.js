"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useState } from "react"

const NavLink = ({ name = "", link = "", isActive = false }) => {
  const [clicked, setClicked] = useState(false)

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
      onClick={playClick}
    >
      {name}
    </Link>
  )
}

export default NavLink
