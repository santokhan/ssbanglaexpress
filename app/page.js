import MapAndForm from "@/components/common/MapAndForm";
import Team from "@/components/common/Team";
import Blogs from "@/components/ui/blogs/BlogsSection";
import Details from "@/components/ui/details/Details";
import Hero from "@/components/ui/hero/Hero";

export async function generateMetadata() {
  return {
    title: "AOS Portfolio",
  };
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Details />
      <Team />
      <Blogs />
      <MapAndForm />
    </main>
  );
}
