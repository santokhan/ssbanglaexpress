"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <Footer />}
    </>
  );
}
