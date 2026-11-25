import MapAndForm from "@/components/common/MapAndForm";
import Team from "@/components/common/Team";
import Details from "@/components/ui/details/Details";
import FAQ from "@/components/ui/faq/FAQ";
import Hero from "@/components/ui/hero/Hero";
import Services from "@/components/ui/services/Services";
import YoutubeVideo from "@/components/ui/youtube/YoutubeVideo";
import ShippingGuide from "@/components/ui/home/ShippingGuide";
import FacebookPagePreview from "@/components/ui/home/FacebookPagePreview";
import InternationalShipping from "@/components/ui/home/InternationalShipping";
import GarmentsSection from "@/components/ui/home/GarmentsSection";
import { contactDetails } from "@/lib/contact-details";
import type { Metadata } from "next";

const siteUrl = `https://${process.env.DOMAIN ?? "ssbanglaexpress.com"}`;

export const metadata: Metadata = {
  title: "International Courier & Cargo from Bangladesh | SS Bangla Express",
  description: "Arrange international door-to-door courier, air cargo, and sea cargo from Bangladesh to the UK, USA, Germany, France, and other destinations. Request a route-specific quote.",
  keywords: ["international shipping from Bangladesh", "door-to-door courier Bangladesh", "air cargo Bangladesh", "sea freight Bangladesh", "shipping to UK", "shipping to USA", "shipping to Germany", "shipping to France", "DDP shipping"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "SS Bangla Express",
      url: siteUrl,
      telephone: contactDetails.shipping.display,
      contactPoint: {
        "@type": "ContactPoint",
        telephone: contactDetails.shipping.display,
        contactType: "shipping enquiries",
        availableLanguage: ["English", "Bengali"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "SS Bangla Express",
      url: siteUrl,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#international-shipping`,
      name: "International door-to-door shipping from Bangladesh",
      serviceType: ["International courier", "Air cargo", "Sea cargo"],
      description: "International courier and cargo shipping coordinated from Bangladesh, with route-specific service and quote confirmation.",
      provider: { "@id": `${siteUrl}/#organization` },
      areaServed: ["United Kingdom", "United States", "Germany", "France", "Europe"],
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `${siteUrl}/quote`,
        servicePhone: contactDetails.shipping.display,
      },
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Hero />
      <Details />
      <Services />
      <GarmentsSection />
      <InternationalShipping />
      <ShippingGuide />
      <YoutubeVideo />
      <FacebookPagePreview />
      <FAQ />
      <Team />
      <MapAndForm />
    </main>
  );
}
