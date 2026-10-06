import Link from "next/link";

const steps = [
  ["Contact us promptly", "Share your booking or tracking reference and let us know you want to cancel. A request is not confirmed until our team replies."],
  ["We check the shipment status", "Available options depend on whether collection has been arranged, the parcel is in transit, or delivery has already been attempted."],
  ["We confirm any applicable charges", "Carrier, collection, return, customs, or other third-party charges may already have been incurred. Our team will explain any amount that applies before confirming the next step."],
];

export default function CancellationPage() {
  return (
    <main className="bg-slate-50 py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#b81e46]/10 px-4 py-1.5 text-sm font-semibold text-[#b81e46]">Booking support</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Cancellation Policy</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">If your plans change, contact our team as soon as possible so we can check what can still be changed.</p>
        </header>
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="leading-7 text-slate-600">Cancellation and refund options depend on the service booked and how far the shipment has progressed. Some transport and handling costs may be non-refundable once a carrier or service partner has begun work. We will confirm the options for your specific booking.</p>
          <ol className="mt-8 space-y-4">
            {steps.map(([title, text], index) => <li key={title} className="flex gap-4 rounded-2xl bg-slate-50 p-5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#b81e46] text-sm font-bold text-white">{index + 1}</span>
              <div><h2 className="font-bold text-slate-900">{title}</h2><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
            </li>)}
          </ol>
          <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-[#b81e46]/15 bg-[#b81e46]/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-slate-700">Have a booking reference? Send it to our team and we’ll review your request.</p>
            <Link href="/contact" className="default shrink-0">Request a cancellation</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
