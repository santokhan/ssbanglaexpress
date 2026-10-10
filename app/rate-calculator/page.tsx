import Link from "next/link";
import ShippingRates from "@/components/ui/forms/ShippingRates";
import VolumetricWeightCalculator from "@/components/ui/forms/VolumetricWeightCalculator";

export const metadata = {
  title: "Shipping Rates | SS Bangla Express",
  description: "Request a confirmed shipping rate for your parcel, destination, and delivery requirements.",
};

export default function RateCalculatorPage() {
  return (
    <main className="bg-slate-50 py-14 sm:py-20">
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-[#b81e46]/10 px-4 py-1.5 text-sm font-semibold text-[#b81e46]">Shipping rates</span>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">Get a rate for your shipment</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">Tell us where your parcel is going and what you’re sending. Our team will confirm the available service and price.</p>
        </header>
        <div className="mx-auto mt-10 max-w-5xl">
          <VolumetricWeightCalculator />
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[1fr_300px]">
          <ShippingRates />
          <aside className="rounded-3xl bg-slate-900 p-7 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-rose-200">For an accurate quote</p>
            <ul className="mt-5 space-y-4 text-sm leading-6 text-slate-200">
              <li>• Origin and destination country</li>
              <li>• Parcel weight and dimensions</li>
              <li>• A brief description of the contents</li>
              <li>• Any delivery or customs requirements</li>
            </ul>
            <Link href="/contact" className="mt-7 inline-flex font-semibold text-white underline decoration-rose-300 underline-offset-4">Need help? Contact us</Link>
          </aside>
        </div>
        <p className="mx-auto mt-6 max-w-5xl text-center text-xs leading-5 text-slate-500">Rates can vary by destination, parcel details, service availability, and carrier charges. A quote from our team is required before booking.</p>
      </div>
    </main>
  );
}
