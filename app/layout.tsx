import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/layout/Navbar";
import Footer from "@/components/layout/footer/Footer";
import FacebookMessenger from "@/components/layout/messnger/FacebookMessenger";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.DOMAIN ?? "ssbanglaexpress.com"}`),
  title: "SS Bangla Express",
  description:
    "International courier service, logistics, shipping, import, door-to-door",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    siteName: "SS Bangla Express",
    title: "SS Bangla Express",
    description:
      "International courier service, logistics, shipping, import, door-to-door",
    images: [{
      url: "/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "SS Bangla Express worldwide door-to-door courier service",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Bangla Express",
    description:
      "International courier service, logistics, shipping, import, door-to-door",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
        <FacebookMessenger />
      </body>
    </html>
  );
}
