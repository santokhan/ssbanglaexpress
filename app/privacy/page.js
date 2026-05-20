import SectionTitle from "@/components/common/SectionTitle";

export default function Page() {
  const date = new Date();

  return (
    <main className="section bg-white text-slate-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#b81e46]/10 px-4 py-1 text-sm font-semibold text-[#b81e46]">
            Privacy Policy
          </span>
          <SectionTitle className="mt-6 text-slate-900">How we protect your information</SectionTitle>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            SS Bangla Express is committed to protecting your privacy while providing courier and logistics services. This policy explains what data we collect, how we use it, and how you can manage your information.
          </p>
          <p className="mt-6 text-sm text-slate-500">Last updated: {date.toLocaleDateString()}</p>
        </div>

        <div className="mt-12 space-y-12">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Information we collect</h2>
            <div className="mt-4 space-y-4 text-slate-600">
              <p>
                We collect information needed to provide and improve our services, including shipment details, sender and receiver contact information, and payment data when you book a delivery.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                <li>Names, addresses, and phone numbers for shipment handling.</li>
                <li>Tracking numbers and parcel status updates.</li>
                <li>Payment details and invoicing information.</li>
                <li>Support communications and service feedback.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">How we use your data</h2>
            <div className="mt-4 space-y-4 text-slate-600">
              <p>
                Your information is used to deliver parcels, manage bookings, handle customs support, and communicate shipment status. We also use it to improve our services and keep our platform secure.
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
                <li>Process orders and schedule pick-up or delivery.</li>
                <li>Send tracking updates and customer support messages.</li>
                <li>Verify identities and prevent fraud.</li>
                <li>Analyze service performance and user experience.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Cookies and analytics</h2>
            <p className="mt-4 text-slate-600">
              We use cookies and similar technologies to improve website performance, remember your preferences, and provide analytics for our service pages. This data is aggregated and does not personally identify visitors unless you choose to provide contact details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Data sharing and security</h2>
            <div className="mt-4 space-y-4 text-slate-600">
              <p>
                We do not sell your personal information. We may share data with trusted partners when necessary to deliver your shipment, such as couriers, customs agents, and payment processors.
              </p>
              <p>
                We maintain administrative, technical, and physical safeguards to protect your information and comply with applicable privacy laws.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Your rights</h2>
            <div className="mt-4 space-y-4 text-slate-600">
              <p>
                You may request access to your personal information, ask us to correct it, or request deletion to the extent allowed by law. Contact us if you have questions about your privacy or how your data is used.
              </p>
              <p>
                For inquiries, please use our contact page or email our support team at <strong>support@ssbanglaexpress.com</strong>.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
