import Logo from "./Logo"
import Link from "next/link"
import { twMerge } from "tailwind-merge"
import MobileNavs from "./MobileNavs"
import NavList from "./navbar/NavList"
import Profile from "./Profile"
import AuthProvider from "@/contexts/AuthProvider"
import { contactDetails } from "@/lib/contact-details"

const Header = ({ className = "", transparent = false }: { className?: string; transparent?: boolean }) => {
  return (
    <header
      className={twMerge(
        "sticky top-0 z-[50] flex h-16 w-full items-center bg-white/90 backdrop-blur border-b transition-all",
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
          <a href={contactDetails.main.tel} className="rounded-full bg-[#b81e46] px-4 py-2 text-sm font-semibold text-white">Call Us</a>
          <AuthProvider>
            <Profile />
          </AuthProvider>
        </div>
        <nav className="flex items-center justify-center lg:hidden">
          <a href={contactDetails.main.tel} className="mr-3 rounded-full bg-[#b81e46] px-3 py-2 text-xs font-semibold text-white">Call</a>
          <MobileNavs />
        </nav>
      </div>
    </header>
  )
}

export default Header
