import Team from "@/components/common/Team";
import AboutUs from "@/components/ui/about/AboutUs";
import Hero from "@/components/ui/about/Hero";
import BannerBottom from "@/components/ui/banner/BannerBottom";

const Page = () => {
  return (
    <div className="">
      <Hero />
      <AboutUs />
      <Team />
      <section className="section">
        <BannerBottom />
      </section>
    </div>
  );
};

export default Page;
