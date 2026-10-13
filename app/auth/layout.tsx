import type { ReactNode } from "react";
import Header, { Navbar } from "@/components/layout/Navbar";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Navbar />
      {children}
    </>
  );
}
