import Image from "next/image";
import Link from "next/link";
import cargoPort from "@/assets/images/services-image.png";
import { contactDetails } from "@/lib/contact-details";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fbf8f6]">
      <div className="pointer-events-none absolute -right-40 -top-48 -z-10 size-[34rem] rounded-full bg-[#b81e46]/[0.06] blur-3xl" />
      <div className="container mx-auto grid min-h-[620px] items-center gap-12 px-4 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:py-20">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#b81e46]/15 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8f1736] shadow-sm">
            <span aria-hidden="true" className="size-2 rounded-full bg-[#b81e46]" />
            A Concern of SS Bangla Group
          </p>
          <h1 className="mt-7 text-5xl font-extrabold leading-[1.06] tracking-tight text-[#26191d] sm:text-6xl lg:text-[4.25rem]">
            Move your business <span className="text-[#b81e46]">beyond borders.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Send shipments worldwide, source products from Bangladesh, or develop your own apparel range with the SS Bangla Group.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/quote" className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#b81e46] px-7 text-sm font-bold text-white shadow-lg shadow-[#b81e46]/20 transition hover:-translate-y-0.5 hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">
              Request a quote <span className="ml-2" aria-hidden="true">→</span>
            </Link>
            <a href={`${contactDetails.shipping.whatsapp}?text=${encodeURIComponent("Hello SS Bangla Express, I would like to ask about international shipping.")}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center rounded-full border border-slate-300 bg-white px-7 text-sm font-bold text-slate-800 transition hover:border-[#b81e46] hover:text-[#8f1736] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">
              Talk to our team
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-5 text-sm font-medium text-slate-600">
            <span>International courier</span><span>Air &amp; sea cargo</span><span>Product sourcing</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[610px] lg:ml-auto">
          <div className="absolute -inset-4 rotate-2 rounded-[2rem] bg-[#b81e46]/10" />
          <div className="relative overflow-hidden rounded-[1.6rem] bg-[#341e25] shadow-2xl shadow-[#341e25]/20">
            <Image src={cargoPort} alt="Freight containers at a shipping port" priority className="aspect-[1.12/1] w-full object-cover opacity-90" width={1000} height={700} />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#21151a]/95 via-[#21151a]/75 to-transparent p-7 pt-24 text-white sm:p-9 sm:pt-28">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">From Bangladesh to the world</p>
              <p className="mt-2 text-2xl font-bold sm:text-3xl">One group. More ways to grow.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
