import MapAndForm from "@/components/common/MapAndForm";
import ContactChannels from "@/components/common/ContactChannels";

export const metadata = {
  title: "Contact | SS Bangla Express",
  description: "Contact SS Bangla Express for shipment support, service information, and route-specific quotes.",
};

function ContactPage() {
  return (
    <main className="bg-slate-50">
      <section className="container mx-auto px-4 pb-2 pt-12 sm:pt-16" id="app-contact-page-section-1">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#b81e46]/10 px-4 py-1.5 text-sm font-semibold text-[#b81e46]">We’re here to help</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Talk to our team</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">Ask about a delivery, request a shipping quote, or get help preparing an international shipment.</p>
        </div>
      </section>
      <MapAndForm />
      <section className="container mx-auto px-4 pb-12" id="app-contact-page-section-2">
        <ContactChannels />
      </section>
    </main>
  );
}

export default ContactPage;
