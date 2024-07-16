import SectionTitle from "@/components/common/SectionTitle";
import Team from "@/components/common/Team";
import BannerBottom from "@/components/ui/banner/BannerBottom";

const AboutHero = () => {
  const backgroundImage = "url(/assets/images/about/about-us.jpg)";
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
  ];

  return (
    <div
      className="bg-cover bg-center bg-no-repeat bg-gray-50"
      style={{ backgroundImage }}
    >
      <div className="bg-white/20+">
        <section className="section space-y-8 min-h-[40vh] flex items-center">
          <div className="container mx-auto px-4">
            <SectionTitle>About Us</SectionTitle>
            {/* <Breadcrumbs breadcrumbs={breadcrumbItems} /> */}
          </div>
        </section>
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="bg-white">
      <AboutHero />
      <Team />
      <section className="section">
        <BannerBottom />
      </section>
    </div>
  );
};

export default Page;
