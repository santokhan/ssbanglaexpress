import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Navigation from "@/components/layout/Navbar";
import AdSenseScript from "@/components/common/AdSenseScript";
import Footer from "@/components/layout/footer/Footer";
import FacebookMessenger from "@/components/layout/messnger/FacebookMessenger";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SS Bangla Express",
  description: "International Courier Service",
};

const PageHead = () => (
  <Head>
    <title>{metadata.title}</title>
    <meta name="description" content={metadata.description} />
    <meta
      name="description"
      content="international,courier,service,logistics,shipping,import,door-to-door"
    />
    <link rel="icon" type="image/svg+xml" href="favicon.svg" />
    <AdSenseScript />
  </Head>
);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <PageHead />
      <body className={inter.className}>
        <Navigation />
        {children}
        <Footer/>
        <FacebookMessenger/>
      </body>
    </html>
  );
}
