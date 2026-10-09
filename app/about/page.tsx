import Team from "@/components/common/Team";
import AboutUs from "@/components/ui/about/AboutUs";
import BannerBottom from "@/components/ui/banner/BannerBottom";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About SS Bangla Express | Courier & Cargo from Bangladesh",
  description: "Learn about SS Bangla Express, the courier and cargo business of SS Bangla Group. Explore international courier, air and sea cargo, and shipment support from Bangladesh.",
};

const Page = () => {
  return (
    <div className="">
      <AboutUs />
      <Team />
      <section className="section">
        <BannerBottom />
      </section>
    </div>
  );
};

export default Page;
