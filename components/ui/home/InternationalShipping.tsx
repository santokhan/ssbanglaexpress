import Link from "next/link";
import { ArrowRight, Globe2, PackageCheck } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

const destinations = [
  { name: "United Kingdom", detail: "Courier and cargo options, subject to route and shipment details." },
  { name: "United States", detail: "Ask us to check the service and delivery options for your destination." },
  { name: "Germany", detail: "International shipping options with route-specific quote support." },
  { name: "France", detail: "Contact our team to confirm current service availability." },
  { name: "Other European countries", detail: "Share the destination country and postcode for an availability check." },
];

export default function InternationalShipping() {
  const whatsapp = `${contactDetails.shipping.whatsapp}?text=${encodeURIComponent("Hello SS Bangla Express, I would like a quote for international shipping. My destination is:")}`;

  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="international-shipping-title">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-[#a51b40]"><Globe2 size={15} aria-hidden="true" /> Shipping from Bangladesh</span>
          <h2 id="international-shipping-title" className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">International door-to-door shipping</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">SS Bangla Express helps coordinate international courier, air cargo, and sea cargo shipments from Bangladesh. Options, transit times, and charges depend on the destination and shipment details.</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map(({ name, detail }) => (
            <article key={name} className="rounded-2xl border border-slate-200 bg-[#faf9f7] p-6">
              <h3 className="text-lg font-bold text-slate-900">{name}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-6 grid max-w-6xl gap-5 rounded-3xl bg-[#321e25] p-6 text-white sm:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex gap-4">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-rose-200"><PackageCheck size={22} aria-hidden="true" /></span>
            <div>
              <h3 className="text-lg font-bold">Delivered Duty Paid (DDP) on eligible routes</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/75">With DDP, import duties and taxes are included in the agreed door-to-door quote where the route and goods qualify. Availability and exactly which charges are covered vary by destination and shipment; our team confirms these in your quote before booking.</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/quote" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-bold text-[#8f1736] hover:bg-rose-50">Request a shipping quote <ArrowRight size={16} aria-hidden="true" /></Link>
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-5 text-sm font-bold text-white hover:bg-white/10">WhatsApp shipping enquiries</a>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-6xl text-xs leading-5 text-slate-500">For current published rate tiers, see <Link href="/rates" className="font-semibold text-[#a51b40] underline underline-offset-2">international shipping rates</Link>. Rates and services are confirmed by our team before booking.</p>
      </div>
    </section>
  );
}
