import type { Metadata } from "next";
import QuoteRequestForm from "@/components/ui/forms/QuoteRequestForm";

export const metadata: Metadata = {
  title: "Request a Quote | SS Bangla Express",
  description: "Request a shipping, sourcing, or manufacturing quote from SS Bangla Group.",
};

export default function QuotePage() {
  return (
    <main className="min-h-svh overflow-hidden bg-[radial-gradient(ellipse_at_top,_#fff1f3_0%,_#f8fafc_48%,_#f8fafc_100%)] py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#b81e46]/10 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#b81e46] shadow-sm"><span className="size-1.5 rounded-full bg-[#b81e46]" /> SS Bangla Group</p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">Let’s get you a <span className="text-[#b81e46]">clear quote.</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-600">Tell us a little about what you need. The right team will review your request and follow up with you.</p>
        </div>
        <QuoteRequestForm />
      </div>
    </main>
  );
}
