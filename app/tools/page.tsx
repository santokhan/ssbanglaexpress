import Link from "next/link";
import BannerBottom from "@/components/ui/banner/BannerBottom";
import SectionTitle from "@/components/common/SectionTitle";

const tools = [
  {
    title: "Shipping quote",
    description: "Share your parcel details and request a confirmed price for your route.",
    href: "/rate-calculator",
    action: "Request a quote",
  },
  {
    title: "Shipment update",
    description: "Contact our team with your tracking reference to ask about a shipment.",
    href: "/contact",
    action: "Ask for an update",
  },
  {
    title: "Service locations",
    description: "Contact our Dhaka team to confirm collection and service availability for your area.",
    href: "/contact",
    action: "Find locations",
  },
  {
    title: "Customs support",
    description: "Ask our team which documents may be needed for your destination and shipment.",
    href: "/contact",
    action: "Ask support",
  },
  {
    title: "Packing checklist",
    description: "Request packing and document guidance for the service and item you plan to send.",
    href: "/contact",
    action: "Request checklist",
  },
  {
    title: "Shipment support",
    description: "Get help with bookings, route questions, and shipment details from our team.",
    href: "/contact",
    action: "Contact us",
  },
];

export default function Page() {
  return (
    <div>
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#b81e46]/10 px-4 py-1 text-sm font-semibold text-[#b81e46]">
                Tools & resources
              </span>
              <SectionTitle className="mt-6 text-slate-900">
                Plan your shipment with the right tools, fast.
              </SectionTitle>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Request a route specific shipping quote, ask our team for a shipment update, and get guidance for your parcel.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/rate-calculator"
                  className="inline-flex items-center rounded-full bg-[#b81e46] px-6 py-3 text-sm font-semibold text-white shadow hover:bg-[#7d162f]"
                >
                  Request a shipping quote
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-full border border-[#b81e46] px-6 py-3 text-sm font-semibold text-[#b81e46] hover:bg-[#b81e46]/5"
                >
                  Contact support
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-xl">
              <div className="space-y-4">
                <div className="rounded-3xl bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b81e46]">Most useful</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">Quick access to digital tools</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Start a quote request or contact our team for shipment and customs support.
                  </p>
                </div>
                <div className="grid gap-4">
                  {tools.slice(0, 3).map((tool) => (
                    <div key={tool.title} className="rounded-3xl bg-white p-5 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.24em] text-slate-400">{tool.title}</p>
                      <p className="mt-3 text-sm leading-6 text-slate-700">{tool.description}</p>
                      <Link href={tool.href} className="mt-4 inline-flex font-semibold text-[#b81e46] underline-offset-4 hover:underline">{tool.action} <span aria-hidden="true" className="ml-2">→</span></Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="grid gap-6 lg:grid-cols-3">
              {tools.map((tool) => (
                <div key={tool.title} className="rounded-3xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:border-[#b81e46]/30 hover:bg-[#b81e46]/5">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#b81e46]">{tool.title}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{tool.description}</p>
                  <Link
                    href={tool.href}
                    className="mt-6 inline-flex items-center text-sm font-semibold text-[#b81e46]"
                  >
                    {tool.action}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <BannerBottom />
      </section>
    </div>
  );
}
