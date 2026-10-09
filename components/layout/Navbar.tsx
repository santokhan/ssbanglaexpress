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
        "sticky top-0 z-[50] flex h-[72px] w-full items-center border-b border-slate-100 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl transition-all",
        className
      )}
    >
      <div className="container mx-auto flex h-full w-full flex-1 items-center justify-between px-4 sm:px-6">
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="router-link-active router-link-exact-active"
          >
            <Logo className="h-11 w-auto sm:h-12" />
          </Link>
        </div>
        <AuthProvider>
          <div className="hidden lg:flex items-center gap-2 xl:gap-4">
            <NavList transparent={transparent} />
            <Link href="/quote" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#b81e46] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">Request a quote</Link>
            <Profile />
          </div>
          <nav aria-label="Mobile actions" className="flex items-center gap-2 lg:hidden">
            <a href={contactDetails.main.tel} aria-label="Call SS Bangla Express" className="inline-flex size-11 items-center justify-center rounded-full bg-[#b81e46] text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] sm:w-auto sm:px-5">Call<span className="hidden sm:inline sm:ml-1"> us</span></a>
            <MobileNavs />
          </nav>
        </AuthProvider>
      </div>
    </header>
  )
}

export default Header

