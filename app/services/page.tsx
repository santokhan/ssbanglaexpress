import BannerBottom from "@/components/ui/banner/BannerBottom";
import Services from "@/components/ui/services/Services";

export default function Page() {
  return (
    <div>
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-[#b81e46]/10 px-4 py-1 text-sm font-semibold text-[#b81e46]">
              Our services
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              Courier, customs support and door-to-door delivery for Bangladesh.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              SS Bangla Express connects businesses and families with reliable shipping, live tracking, and logistics support across Bangladesh and international destinations.
            </p>
          </div>
        </div>
      </section>

      <Services />

      <section className="section">
        <BannerBottom />
      </section>
    </div>
  );
}
