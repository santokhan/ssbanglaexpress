import Link from "next/link";
import { ArrowRight, ClipboardList, PackageCheck, Plane, ReceiptText } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell us about your shipment",
    description: "Share the pickup and delivery locations, what you are sending, and the package weight and carton count.",
    Icon: ClipboardList,
  },
  {
    number: "02",
    title: "Review available options",
    description: "Our team will check your route and shipment details, then discuss the suitable service and quote with you.",
    Icon: Plane,
  },
  {
    number: "03",
    title: "Confirm and prepare",
    description: "Once you are ready to proceed, we will help coordinate the next steps for handover and shipment preparation.",
    Icon: PackageCheck,
  },
  {
    number: "04",
    title: "Keep in touch through delivery",
    description: "Use your tracking number on our tracking page, or contact the team if you need help with your shipment.",
    Icon: ReceiptText,
  },
];

const details = [
  "Pickup and delivery locations",
  "A short description of the contents",
  "Weight and number of cartons",
  "Package dimensions, if available",
];

export default function ShippingGuide() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f4f1] py-20 sm:py-28">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 -z-10 size-[34rem] rounded-full bg-[#b81e46]/[0.07] blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-32 -z-10 size-[28rem] rounded-full bg-[#ddbd9e]/[0.18] blur-3xl" />
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#b81e46]/15 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#a51b40] shadow-sm">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-[#b81e46]" />
            Shipping, made clearer
          </p>
          <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-[#26191d] sm:text-5xl">From your first question <span className="text-[#b81e46]">to delivery.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Know what to expect at each step, and what information helps us guide your shipment.</p>
        </div>

        <ol className="relative mx-auto mt-14 grid max-w-6xl gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {steps.map(({ number, title, description, Icon }) => (
            <li key={number} className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.4rem] border border-[#e7ded9] bg-white/90 p-6 shadow-[0_16px_45px_-32px_rgba(38,25,29,0.3)] transition duration-300 hover:-translate-y-1 hover:border-[#b81e46]/30 hover:shadow-[0_24px_55px_-32px_rgba(38,25,29,0.28)] sm:p-7">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#b81e46] via-[#d88975] to-[#e9c8b9] opacity-70 transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#fff0f2] to-[#f8e8e3] text-[#a51b40] ring-1 ring-[#b81e46]/10 transition duration-300 group-hover:scale-105"><Icon aria-hidden="true" size={22} strokeWidth={1.8} /></span>
                <span className="font-mono text-xs font-bold tracking-[0.22em] text-[#b81e46]/55">STEP {number}</span>
              </div>
              <h3 className="mt-7 text-lg font-extrabold leading-snug text-[#26191d]">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
            </li>
          ))}
        </ol>

        <div className="relative mx-auto mt-7 grid max-w-6xl overflow-hidden rounded-[1.6rem] bg-[#321e25] shadow-[0_25px_65px_-35px_rgba(38,25,29,0.55)] lg:grid-cols-[1fr_auto]">
          <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-28 size-80 rounded-full border border-white/[0.07]" />
          <div aria-hidden="true" className="pointer-events-none absolute -right-1 -top-16 size-56 rounded-full border border-white/[0.07]" />
          <div className="relative p-7 sm:p-9 lg:p-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-rose-300">A helpful checklist</p>
            <h3 className="mt-3 max-w-xl text-2xl font-extrabold leading-tight text-white sm:text-3xl">A few details help us prepare the right quote.</h3>
            <ul className="mt-6 grid gap-x-8 gap-y-3 text-sm text-white/75 sm:grid-cols-2">
              {details.map((detail) => <li key={detail} className="flex items-center gap-3"><span aria-hidden="true" className="grid size-5 shrink-0 place-items-center rounded-full bg-[#b81e46] text-[10px] font-bold text-white">✓</span>{detail}</li>)}
            </ul>
          </div>
          <div className="relative flex items-center border-t border-white/10 bg-white/[0.04] p-7 sm:p-9 lg:border-l lg:border-t-0 lg:px-9">
            <div>
              <p className="text-sm text-white/60">Ready to get started?</p>
              <Link href="/quote" className="mt-4 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#8f1736] shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-rose-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                Request a quote <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
