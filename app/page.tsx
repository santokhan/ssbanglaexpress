import MapAndForm from "@/components/common/MapAndForm";
import Team from "@/components/common/Team";
import Blogs from "@/components/ui/blogs/BlogsSection";
import Details from "@/components/ui/details/Details";
import FAQ from "@/components/ui/faq/FAQ";
import Hero from "@/components/ui/hero/Hero";
import Services from "@/components/ui/services/Services";

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
      <FAQ />
      <Team />
      <Blogs />
      <MapAndForm />
    </main>
  );
}
