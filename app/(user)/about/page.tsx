import Team from "@/components/common/Team";
import AboutUs from "@/components/ui/about/AboutUs";
import BannerBottom from "@/components/ui/banner/BannerBottom";
import type { Metadata } from "next";
import CopyPageContent from "@/components/common/CopyPageContent";

export const metadata: Metadata = {
  title: "About SS Bangla Express | Courier & Cargo from Bangladesh",
  description: "Learn about SS Bangla Express, the courier and cargo business of SS Bangla Group. Explore international courier, air and sea cargo, and shipment support from Bangladesh.",
};

const Page = () => {
  return (
    <div id="share-page-content">
      <div className="container mx-auto flex justify-end px-4 pt-5"><CopyPageContent contentId="share-page-content" /></div>
      <AboutUs />
      <Team />
      <section className="section" id="app-about-page-section-1"><BannerBottom /></section>
    </div>
  );
};

export default Page;
