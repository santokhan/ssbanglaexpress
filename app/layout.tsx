import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FacebookMessenger from "@/components/layout/messnger/FacebookMessenger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SS Bangla Express",
  description:
    "International courier service, logistics, shipping, import, door-to-door",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <FacebookMessenger />
      </body>
    </html>
  );
}
