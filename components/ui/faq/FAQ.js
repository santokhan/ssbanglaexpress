const FAQ = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-4">
          <details className="rounded-3xl border border-gray-200 p-5">
            <summary className="cursor-pointer text-lg font-semibold text-slate-900">
              How can I send a parcel with SS Bangla Express?
            </summary>
            <p className="mt-4 text-gray-600">
              Use the tracking panel in the hero section or contact us via WhatsApp to book pickup from Dhaka and deliver across Bangladesh or internationally.
            </p>
          </details>
          <details className="rounded-3xl border border-gray-200 p-5">
            <summary className="cursor-pointer text-lg font-semibold text-slate-900">
              Do you offer cash on delivery?
            </summary>
            <p className="mt-4 text-gray-600">
              Yes, we offer COD for customer deliveries. Merchants can choose this option during booking and receive payment through our secure collection process.
            </p>
          </details>
          <details className="rounded-3xl border border-gray-200 p-5">
            <summary className="cursor-pointer text-lg font-semibold text-slate-900">
              What areas do you cover?
            </summary>
            <p className="mt-4 text-gray-600">
              We cover Dhaka city and all major districts across Bangladesh, with international routes to UK, Europe, USA, and Australia.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
