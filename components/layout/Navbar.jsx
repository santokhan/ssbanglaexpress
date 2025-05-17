import Logo from "./Logo"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import MobileNavs from "./MobileNavs"
import NavList from "./navbar/NavList"
import Profile from "./Profile"
import AuthProvider from "@/contexts/AuthProvider"

const NavBar = ({ className = "", transparent = false }) => {
  return (
    <nav
      className={twMerge(
        "sticky top-0 z-[2] flex h-16 w-full items-center bg-white/90 backdrop-blur border-b transition-all",
        className
      )}
    >
      <div className="container mx-auto flex w-full flex-1 items-center justify-between px-4 h-full">
        <div className="md:w-2/12 flex-shrink-0 flex">
          <Link
            href="/"
            className="router-link-active router-link-exact-active"
          >
            <Logo className="max-h-14" />
          </Link>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <NavList transparent={transparent} />
          <AuthProvider>
            <Profile />
          </AuthProvider>
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <MobileNavs />
        </div>
      </div>
    </nav>
  )
}

export default NavBar
