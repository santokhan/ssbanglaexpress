'use client'

import { usePathname } from "next/navigation"
import NavLink from "./NavLink"
import { navbarNavsArray } from "../navs"

type NavListProps = { transparent?: boolean; className?: string; onNavigate?: () => void };

const NavList = ({ className = "", onNavigate }: NavListProps) => {
  const pathName = usePathname()

  return (
    <nav className={`flex flex-col lg:flex-row items-center text-2xl lg:text-lg ${className}`}>
      {navbarNavsArray.map((linkObject) => (
        <NavLink
          key={linkObject.link}
          link={linkObject.link}
          name={linkObject.name}
          isActive={pathName === linkObject.link}
          onClick={onNavigate}
        />
      ))}
    </nav>
  )
}

export default NavList
