import MapAndForm from "@/components/common/MapAndForm";
import Team from "@/components/common/Team";
import Details from "@/components/ui/details/Details";
import FAQ from "@/components/ui/faq/FAQ";
import Hero from "@/components/ui/hero/Hero";
import Services from "@/components/ui/services/Services";
import YoutubeVideo from "@/components/ui/youtube/YoutubeVideo";
import ShippingGuide from "@/components/ui/home/ShippingGuide";
import FacebookPagePreview from "@/components/ui/home/FacebookPagePreview";

export async function generateMetadata() {
  return {
    title: "SS Bangla Express | Worldwide Courier Service",
    description:
      "Worldwide door-to-door courier service from Bangladesh to UK, Europe, USA, Australia and beyond.",
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Details />
      <Services />
      <ShippingGuide />
      <YoutubeVideo />
      <FacebookPagePreview />
      <FAQ />
      <Team />
      <MapAndForm />
    </main>
  );
}
