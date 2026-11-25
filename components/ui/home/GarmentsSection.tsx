import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, PackageCheck } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

const categories = ["Jackets", "Sweatshirts", "Tracksuits", "Other available garments"];

export default function GarmentsSection() {
  const enquiry = `${contactDetails.sourcing.whatsapp}?text=${encodeURIComponent("Hello SSK Sourcing BD, I am interested in ready-stock garments. Please share current stock photos, availability, last updated date, MOQ, and quotation for:")}`;

  return (
    <section id="garments" className="bg-[#faf7f5] py-20 sm:py-24" aria-labelledby="garments-title">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#b81e46]">SSK Sourcing BD · Ready stock</p>
            <h2 id="garments-title" className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Garments, ready to discuss.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-slate-600">Explore ready-stock garment categories from SSK Sourcing BD. Ask our team for current product and stock photos, availability, minimum order quantities, and a quotation.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#a51b40] px-6 text-sm font-bold text-white transition hover:bg-[#811632]">Request garment quotation <ArrowRight size={16} aria-hidden="true" /></a>
              <Link href="/quote" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-6 text-sm font-bold text-slate-800 transition hover:border-slate-400">Use quote form</Link>
            </div>
          </div>

          <div className="relative min-h-[270px] overflow-hidden rounded-3xl bg-slate-200 sm:min-h-[340px]">
            <Image src="/images/business-textile-sourcing.jpg" alt="Garments on hangers representing SSK Sourcing BD garment categories" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-6 pt-20 text-white">
              <p className="text-sm font-semibold">SSK Sourcing BD</p>
              <p className="mt-1 text-xs text-white/80">Garment sourcing · Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <article key={category} className="rounded-2xl border border-slate-200 bg-white p-5">
              <span className="text-xs font-bold tracking-widest text-[#b81e46]">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-bold text-slate-900">{category}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Request current styles, stock photos, sizes, and available quantities from our sourcing team.</p>
            </article>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-rose-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-700">
            <span className="inline-flex items-center gap-2"><PackageCheck size={17} className="text-[#b81e46]" aria-hidden="true" /> Availability and MOQ confirmed per item</span>
            <span className="inline-flex items-center gap-2"><CalendarDays size={17} className="text-[#b81e46]" aria-hidden="true" /> Ask for the latest stock update</span>
          </div>
          <a href={enquiry} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-[#b81e46]/25 px-5 text-sm font-bold text-[#a51b40] transition hover:bg-rose-50">WhatsApp garment enquiries</a>
        </div>
      </div>
    </section>
  );
}
