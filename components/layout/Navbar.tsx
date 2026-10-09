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
    <AuthProvider>
      <header className={twMerge("w-full bg-white", className)}>
        <div className="container mx-auto flex h-[64px] items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex shrink-0 items-center" aria-label="SS Bangla Express home">
            <Logo className="h-9 w-auto sm:h-10" />
          </Link>
          <Profile />
        </div>
      </header>

      <nav className="sticky top-0 z-[50] w-full border-y border-slate-100 bg-white/95 shadow-sm shadow-slate-900/[0.03] backdrop-blur-xl transition-all" aria-label="Main navigation">
        <div className="container mx-auto flex h-[52px] items-center justify-between px-4 sm:px-6">
          <div className="hidden lg:flex w-full items-center justify-between gap-4">
            <NavList transparent={transparent} />
            <Link href="/quote" className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#b81e46] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">Request a quote</Link>
          </div>
          <div className="flex w-full items-center justify-between lg:hidden">
            <span className="text-sm font-semibold text-slate-700">Menu</span>
            <div className="flex items-center gap-2">
              <a href={contactDetails.main.tel} aria-label="Call SS Bangla Express" className="inline-flex size-11 items-center justify-center rounded-full bg-[#b81e46] text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46] sm:w-auto sm:px-5">Call<span className="hidden sm:inline sm:ml-1"> us</span></a>
              <MobileNavs />
            </div>
          </div>
        </div>
      </nav>
    </AuthProvider>
  )
}

export default Header

