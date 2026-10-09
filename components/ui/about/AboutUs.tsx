import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Boxes, Check, Globe2, PackageCheck, Plane, Ship, Shirt, Truck } from "lucide-react";
import aboutImage from "@/assets/images/about-us.png";

const services = [
  {
    icon: Plane,
    title: "International courier",
    description: "Send documents, parcels, and business goods from Bangladesh to destinations around the world.",
  },
  {
    icon: Truck,
    title: "Door-to-door delivery",
    description: "Get help coordinating a shipment from collection through to delivery, with options shaped around its route and needs.",
  },
  {
    icon: Ship,
    title: "Air and sea cargo",
    description: "Explore air or sea freight for larger and commercial shipments. The best fit depends on your cargo, destination, and timing.",
  },
  {
    icon: PackageCheck,
    title: "Shipment guidance and tracking",
    description: "Get help preparing shipment details, requesting a route-specific quote, and following your parcel through the selected carrier.",
  },
];

const steps = [
  ["01", "Tell us about your shipment", "Share the origin, destination, goods, weight, and any timing or handling needs."],
  ["02", "Review your route and quote", "Our team can help identify a suitable service and confirm the details for your shipment."],
  ["03", "Prepare and send", "Once the service is agreed, prepare your parcel or cargo with the guidance provided."],
  ["04", "Follow its progress", "Use the selected carrier’s tracking page to check shipment updates along the way."],
];

const groupBusinesses = [
  { icon: Boxes, name: "SS Bangla Global Trade", description: "Wholesale and export or import support." },
  { icon: Shirt, name: "Bongo Apparel Ltd", description: "Apparel manufacturing support for private-label brands." },
  { icon: Globe2, name: "SSK Sourcing BD & SS Bangla Tex Sourcing", description: "Garment, leather, knit, and woven product sourcing." },
];

export default function AboutUs() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative isolate overflow-hidden bg-[#faf7f5]">
        <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-[#b81e46]/[0.06] blur-3xl" />
        <div className="container mx-auto grid items-center gap-12 px-4 py-16 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b81e46]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#a51b40] shadow-sm">
              <span className="size-2 rounded-full bg-[#b81e46]" /> A Concern of SS Bangla Group
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Helping your shipment make its <span className="text-[#b81e46]">next move.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              SS Bangla Express is the group’s courier and cargo business. We help individuals and businesses send parcels and goods from Bangladesh through worldwide door-to-door courier, air cargo, and sea cargo services, with a focus on garments logistics and export support.
            </p>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Every route is different. Tell us what you are sending and where it needs to go, and our team can help you understand the available options and request a shipment-specific quote.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/quote" className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#b81e46] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/15 transition hover:-translate-y-0.5 hover:bg-[#97183b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-2">
                Request a shipping quote <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href="#how-it-works" className="inline-flex min-h-12 items-center gap-2 px-2 text-sm font-semibold text-slate-700 hover:text-[#a51b40]">
                How it works <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 text-sm text-slate-500">A Concern of SS Bangla Group</p>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="absolute -inset-4 -rotate-3 rounded-[2rem] bg-[#b81e46]/[0.08]" />
            <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-200 shadow-2xl shadow-slate-900/10">
              <Image src={aboutImage} alt="International freight and shipment handling" width={900} height={700} priority className="aspect-[5/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 left-4 right-4 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-xl backdrop-blur sm:left-8 sm:right-8 sm:p-5">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[#fff0f3] text-[#b81e46]"><Globe2 size={23} aria-hidden="true" /></span>
                <div>
                  <p className="font-bold text-slate-900">From Bangladesh to your destination</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">International courier, air freight, and sea freight options.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b81e46]">What we do</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Shipping support for different kinds of journeys.</h2>
          <p className="mt-4 leading-7 text-slate-600">From a single parcel to commercial cargo, the right service depends on your route, shipment, and priorities.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#b81e46]/30 hover:shadow-lg">
              <span className="grid size-12 place-items-center rounded-xl bg-[#fff1f3] text-[#b81e46]"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
              <h3 className="mt-5 text-lg font-bold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-20 bg-[#f8f7f6] py-20 sm:py-24">
        <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="max-w-lg">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b81e46]">A clear place to start</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">From your first question to a shipment on its way.</h2>
            <p className="mt-5 leading-7 text-slate-600">Start with the details you know. We’ll use the route and shipment information to guide the conversation and help you get a suitable quote.</p>
            <div className="mt-7 space-y-3 text-sm text-slate-700">
              {["Origin and destination", "What you are sending", "Approximate weight and number of cartons", "Any timing or special handling needs"].map((item) => (
                <p key={item} className="flex items-center gap-3"><span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#b81e46]/10 text-[#a51b40]"><Check size={14} aria-hidden="true" /></span>{item}</p>
              ))}
            </div>
            <Link href="/quote" className="mt-8 inline-flex items-center gap-2 font-bold text-[#a51b40] hover:text-[#74132e]">Tell us about your shipment <ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {steps.map(([number, title, description]) => (
              <li key={number} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-sm font-extrabold tracking-widest text-[#b81e46]">{number}</span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-slate-950 px-6 py-10 text-white sm:px-10 sm:py-12">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-rose-300">Part of a wider group</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Connected expertise, distinct teams.</h2>
          <p className="mt-4 leading-7 text-slate-300">SS Bangla Group brings together businesses supporting logistics and trade. SS Bangla Express focuses on courier and cargo; the group’s other teams work across sourcing, textiles, apparel, and wholesale trade.</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {groupBusinesses.map(({ icon: Icon, name, description }) => (
              <div key={name} className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
                <Icon size={20} className="text-rose-300" aria-hidden="true" />
                <h3 className="mt-3 text-sm font-bold leading-5 text-white">{name}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-300">{description}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-5 text-slate-400">For product sourcing, private-label apparel, or wholesale trade, we’ll help direct your enquiry to the relevant group team.</p>
          <Link href="/services" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-rose-200 hover:text-white">Explore group services <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </div>
  );
}
