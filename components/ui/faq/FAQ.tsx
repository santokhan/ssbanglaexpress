import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { contactDetails } from "@/lib/contact-details";

const questions = [
  {
    question: "How can I send a parcel with SS Bangla Express?",
    answer:
      "Use the tracking panel in the hero section or contact us via WhatsApp to book pickup from Dhaka and deliver across Bangladesh or internationally.",
  },
  {
    question: "Do you offer cash on delivery?",
    answer:
      "Yes, we offer COD for customer deliveries. Merchants can choose this option during booking and receive payment through our secure collection process.",
  },
  {
    question: "What areas do you cover?",
    answer:
      "We cover Dhaka city and all major districts across Bangladesh, with international routes to UK, Europe, USA, and Australia.",
  },
];

const FAQ = () => {
  return (
    <section className="section relative isolate overflow-hidden bg-gradient-to-b from-rose-50/70 via-white to-white">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-8 -z-10 size-80 rounded-full bg-[#b81e46]/[0.05] blur-3xl" />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b81e46]/15 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a51b40] shadow-sm">
              <MessageCircleQuestion aria-hidden="true" size={15} /> Helpful answers
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-[2.65rem] lg:leading-tight">
              Frequently asked questions
            </h2>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              Everything you need to know about sending with SS Bangla Express.
              Still have a question? Our team is happy to help.
            </p>
            <a
              href={`${contactDetails.shipping.whatsapp}?text=${encodeURIComponent("Hello SS Bangla Express, I have a question about your services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#a51b40] transition hover:text-[#7d162f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-4"
            >
              Talk to our team <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="space-y-3">
            {questions.map(({ question, answer }, index) => (
              <details
                key={question}
                className="group rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.25)] transition duration-200 open:border-[#b81e46]/25 open:bg-white open:shadow-[0_18px_45px_-30px_rgba(184,30,70,0.25)] sm:p-6"
              >
                <summary className="flex cursor-pointer list-none items-center gap-4 rounded-lg text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b81e46] focus-visible:ring-offset-4 [&::-webkit-details-marker]:hidden">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#b81e46]/[0.07] text-sm font-extrabold text-[#a51b40] transition group-open:bg-[#b81e46] group-open:text-white">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base font-bold leading-6 text-slate-900 sm:text-lg">
                    {question}
                  </span>
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-slate-50 text-slate-500 transition group-open:rotate-180 group-open:bg-rose-50 group-open:text-[#a51b40]">
                    <ChevronDown aria-hidden="true" size={19} />
                  </span>
                </summary>
                <p className="ml-14 mt-4 max-w-2xl border-l-2 border-rose-100 pl-4 text-sm leading-7 text-slate-600 sm:text-[15px]">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
