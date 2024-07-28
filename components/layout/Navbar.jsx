"use client";

import Logo from "./Logo";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import MobileNavs from "./MobileNavs";
import { useEffect, useState } from "react";
import NavList from "./navbar/NavList";

const NavBar = ({ className = "", transparent = false }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (window) {
      window.addEventListener('scroll', () => {
        setScrollY(window.scrollY)
      })
    }
  }, [])

  return (
    <nav
      className={twMerge(
        "top-0 z-[2] flex h-16 w-full items-center bg-white border-b sticky transition-all",
        scrollY == 0 ? "lg:h-20" : "",
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
        <div className="hidden lg:block">
          <NavList transparent={transparent} />
        </div>
        <div className="flex items-center justify-center lg:hidden">
          <MobileNavs />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
