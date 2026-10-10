import Link from "next/link";
import Image from "next/image";
import { Boxes, Search, Shirt, ShoppingBag, Truck } from "lucide-react";
import courierImage from "@/assets/images/about-us.webp";
import cargoImage from "@/assets/images/services-image.webp";
import sourcingImage from "@/assets/images/services-section.webp";

const businesses = [
  {
    number: "01",
    name: "SS Bangla Express",
    category: "Courier & cargo",
    description: "International courier, air and sea cargo, and destination-specific shipping support.",
    image: cargoImage,
    imageAlt: "Cargo containers ready for international freight",
    Icon: Truck,
  },
  {
    number: "02",
    name: "SSK Sourcing BD",
    category: "Product sourcing",
    description: "Garments and leather sourcing, ready stock, stock lots, quality checks, and packing.",
    image: sourcingImage,
    imageAlt: "Port cranes handling goods for international trade",
    Icon: Search,
  },
  {
    number: "03",
    name: "SS Bangla Global Trade",
    category: "Wholesale & trade",
    description: "Wholesale and export or import support for your business requirements.",
    image: cargoImage,
    imageAlt: "Shipping containers stacked at a seaport for international trade",
    Icon: Boxes,
  },
  {
    number: "04",
    name: "Bongo Apparel Ltd",
    category: "Private label",
    description: "Apparel manufacturing support for brands building their own product range.",
    image: "/images/business-apparel-manufacturing.jpg",
    imageAlt: "Finished garments displayed for an apparel brand",
    Icon: Shirt,
  },
  {
    number: "05",
    name: "SS Bangla Tex Sourcing",
    category: "Textile sourcing",
    description: "Knit and woven product sourcing for your apparel and textile needs.",
    image: "/images/business-textile-sourcing.jpg",
    imageAlt: "Knit garments on hangers representing apparel and textile sourcing",
    Icon: ShoppingBag,
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b81e46]">What we do</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Find the right team for your next move.</h2>
            <p className="mt-4 leading-7 text-slate-600">A connected group of specialists for shipping, sourcing, trade, and apparel.</p>
          </div>
          <Link href="/quote" className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#a51b40] hover:text-[#74132e]">Explore your options <span aria-hidden="true">→</span></Link>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businesses.map(({ Icon, ...business }, index) => (
            <article key={business.name} className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:border-[#b81e46]/35 hover:shadow-xl hover:shadow-slate-900/[0.06] ${index === 0 ? "bg-[#fff9f7]" : ""}`}>
              <div className="relative h-44 overflow-hidden bg-[#f7f3f1]">
                <Image src={business.image} alt={business.imageAlt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#8f1736] shadow-sm">{business.category}</span>
              </div>
              <div className="flex min-h-[245px] flex-col p-6">
              <div className="flex items-center justify-between">
                <span className="grid size-10 place-items-center rounded-xl bg-[#fff2f4] text-[#b81e46]"><Icon aria-hidden="true" size={21} strokeWidth={1.8} /></span>
                <span className="text-sm font-semibold text-slate-300">{business.number}</span>
              </div>
              <h3 className="mt-7 text-xl font-bold text-slate-900">{business.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{business.description}</p>
              <Link href="/quote" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#a51b40]">Talk to this team <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
