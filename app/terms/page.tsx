import Link from "next/link";
import CopyPageContent from "@/components/common/CopyPageContent";

const sections = [
  {
    title: "Bookings and service details",
    text: "A shipment is accepted after SS Bangla Express confirms the service, route, price, collection details, and any documents required. Please check the quote and shipment details before confirming a booking.",
  },
  {
    title: "Packaging and shipment information",
    text: "The sender is responsible for accurate sender and recipient details, a clear description of the contents, and packaging suitable for the item and journey. Tell us about fragile, valuable, restricted, or unusually shaped goods before booking.",
  },
  {
    title: "Customs and restricted goods",
    text: "International shipments may be inspected and can require customs forms, duties, taxes, or other charges. The sender must provide truthful information and the documents requested. Acceptance and delivery can depend on destination rules and customs decisions.",
  },
  {
    title: "Delivery estimates and tracking",
    text: "Any delivery window shared at booking is an estimate and may change because of transport schedules, weather, customs processing, or other events outside our control. Tracking information is provided when available from the handling carrier.",
  },
  {
    title: "Charges and support",
    text: "The confirmed quote explains the applicable service charges. Additional costs may apply when shipment details change or when carriers, customs authorities, or other service partners assess fees. Contact our team before booking if anything is unclear.",
  },
];

export default function TermsPage() {
  return (
    <main className="bg-slate-50 py-14 sm:py-20">
      <div id="share-page-content" className="container mx-auto px-4">
        <div className="mb-6 flex justify-end"><CopyPageContent contentId="share-page-content" /></div>
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#b81e46]/10 px-4 py-1.5 text-sm font-semibold text-[#b81e46]">Customer information</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Terms &amp; Conditions</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">A clear overview of the information that applies when arranging a shipment with SS Bangla Express.</p>
        </header>
        <article className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="leading-7 text-slate-600">The details confirmed for your shipment, together with any service-specific conditions shared by our team, apply to your booking. Please contact us before sending if you need clarification about a route or item.</p>
          <div className="mt-8 divide-y divide-slate-100">
            {sections.map((section) => <section key={section.title} className="py-6 first:pt-0 last:pb-0">
              <h2 className="text-lg font-bold text-slate-900">{section.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{section.text}</p>
            </section>)}
          </div>
          <div className="mt-8 rounded-2xl bg-slate-50 p-5 text-sm leading-6 text-slate-600">
            Questions about a shipment or these terms? <Link href="/contact" className="font-semibold text-[#b81e46] underline-offset-4 hover:underline">Contact our team</Link> for the conditions applicable to your route and service.
          </div>
        </article>
      </div>
    </main>
  );
}
