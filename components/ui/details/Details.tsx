import Link from "next/link";
import { ArrowRight, Boxes, Globe2, PackageCheck, Plane, Shirt } from "lucide-react";

const paths = [
  {
    title: "Send a shipment",
    description: "Courier and air or sea cargo, from pickup to delivery.",
    detail: "SS Bangla Express",
    Icon: Plane,
  },
  {
    title: "Source products",
    description: "Garments, leather goods, ready stock, and quality checks.",
    detail: "SSK Sourcing BD · Global Trade",
    Icon: Boxes,
  },
  {
    title: "Build your apparel range",
    description: "Private-label production plus knit and woven sourcing.",
    detail: "Bongo Apparel · SS Bangla Tex Sourcing",
    Icon: Shirt,
  },
];

export default function Details() {
  return (
    <section className="bg-[#f7f5f3] py-20 sm:py-24" id="components-ui-details-details-section-1">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b81e46]">Start here</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">What would you like to do?</h2>
          <p className="mt-4 leading-7 text-slate-600">Choose a path and we’ll connect your request with the relevant team.</p>
        </div>
        <div className="mx-auto mt-10 flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-[#eadde0] bg-white px-4 py-5 shadow-sm sm:gap-7 sm:px-8" aria-label="Bangladesh shipment journey: pickup, air or sea transport, worldwide delivery">
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#fff2f4] text-[#a51b40] sm:size-16"><PackageCheck aria-hidden="true" size={29} strokeWidth={1.7} /></span>
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Pickup in Bangladesh</span>
          </div>
          <div className="flex flex-1 items-center text-[#d7a1af]" aria-hidden="true"><span className="h-px flex-1 border-t-2 border-dashed border-current"/><ArrowRight size={20}/></div>
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#fff2f4] text-[#a51b40] sm:size-16"><Plane aria-hidden="true" size={29} strokeWidth={1.7} /></span>
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Air or sea cargo</span>
          </div>
          <div className="flex flex-1 items-center text-[#d7a1af]" aria-hidden="true"><span className="h-px flex-1 border-t-2 border-dashed border-current"/><ArrowRight size={20}/></div>
          <div className="flex min-w-0 flex-col items-center gap-2 text-center">
            <span className="grid size-14 place-items-center rounded-2xl bg-[#fff2f4] text-[#a51b40] sm:size-16"><Globe2 aria-hidden="true" size={29} strokeWidth={1.7} /></span>
            <span className="text-xs font-bold text-slate-700 sm:text-sm">Worldwide delivery</span>
          </div>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {paths.map(({ title, description, detail, Icon }) => (
            <article key={title} className="group flex min-h-[280px] flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#b81e46]/30 hover:shadow-xl hover:shadow-slate-900/[0.06]">
              <div className="flex size-12 items-center justify-center rounded-xl bg-[#b81e46]/[0.08] text-[#a51b40]"><Icon aria-hidden="true" size={23} strokeWidth={1.8} /></div>
              <h3 className="mt-6 text-xl font-bold text-slate-900">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{description}</p>
              <div className="mt-5 flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
                <span className="text-xs font-semibold text-slate-500">{detail}</span>
                <Link href="/quote" aria-label={`Request a quote: ${title}`} className="grid size-10 shrink-0 place-items-center rounded-full bg-[#b81e46] text-white shadow-md shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a]">→</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
