import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MetaPixel from "@/components/analytics/MetaPixel";
import Footer from "@/components/layout/footer/Footer";
import ChatBubble from "@/components/chat/ChatBubble";
import Header, { Navbar } from "@/components/layout/Navbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(
    `https://${process.env.DOMAIN ?? "ssbanglaexpress.com"}`,
  ),
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
    images: [
      {
        url: "/opengraph-image.webp",
        width: 1200,
        height: 630,
        alt: "SS Bangla Express worldwide door-to-door courier service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SS Bangla Express",
    description:
      "International courier service, logistics, shipping, import, door-to-door",
    images: ["/opengraph-image.webp"],
  },
};

export default function UserLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Header />
      <Navbar />
      {children}
      <Footer />

      <ChatBubble />

      <MetaPixel />
      <GoogleAnalytics />
    </>
  );
}
