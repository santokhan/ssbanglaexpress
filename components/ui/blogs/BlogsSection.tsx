import Link from "next/link";

const topics = [
  { number: "01", title: "Prepare your parcel", description: "Packing and labelling basics that help your shipment travel safely." },
  { number: "02", title: "Understand customs", description: "What to have ready when sending goods across borders." },
  { number: "03", title: "Plan your delivery", description: "Details that help us recommend a suitable route and service." },
];

export default function BlogsSection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#b81e46]">Helpful resources</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Useful guidance for your next shipment</h2>
          <p className="mt-4 leading-7 text-slate-600">Our team can help you prepare documents, understand route requirements, and choose a service for your parcel.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
          {topics.map((topic) => <article key={topic.number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
            <span className="text-sm font-bold tracking-widest text-[#b81e46]">{topic.number}</span>
            <h3 className="mt-5 text-xl font-bold text-slate-950">{topic.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{topic.description}</p>
          </article>)}
        </div>
        <p className="mt-9 text-center text-sm text-slate-600">Need advice for a specific shipment? <Link href="/contact" className="font-semibold text-[#b81e46] underline-offset-4 hover:underline">Talk to our team</Link>.</p>
      </div>
    </section>
  );
}
