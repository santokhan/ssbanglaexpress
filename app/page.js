import ContactForm from "@/components/common/ContactFrom";
import Team from "@/components/common/Team";
import Details from "@/components/ui/details/Details";
import Hero from "@/components/ui/hero/Hero";
import Map from "@/components/ui/Map";

const MapAndForm = () => {
  return (
    <div className="container mx-auto px-4 flex flex-row">
      <Map className="basis-96 flex-grow" />
      <ContactForm className="basis-96 flex-grow" />
    </div>
  );
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Details />
      
      <MapAndForm />

      <Map className="basis-96 flex-grow" />
      <ContactForm className="basis-96 flex-grow" />

      <Team />
    </main>
  );
}
