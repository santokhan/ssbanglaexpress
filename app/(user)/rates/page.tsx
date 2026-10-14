import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "International Shipping Rates | SS Bangla Express",
  description: "Published international courier and cargo rates from Bangladesh by destination, service, and parcel weight.",
  alternates: { canonical: "/rates" },
};

export default async function RatesPage() {
  const rates = await prisma.publicRate.findMany({ where: { active: true }, orderBy: [{ destination: "asc" }, { service: "asc" }, { minWeightKg: "asc" }] });
  const lastUpdated = rates.reduce<Date | null>((latest, rate) => !latest || rate.updatedAt > latest ? rate.updatedAt : latest, null);
  return <main className="min-h-screen bg-[#faf9f7]">
    <section className="bg-[#17191d] px-4 py-14 text-white sm:px-6 sm:py-20">
      <div className="container mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-rose-200">SS Bangla Express · Bangladesh</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">International shipping rates</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Published rate tiers by origin, destination, service, and shipment weight. Use the table below or access the same current data in <a className="font-semibold text-white underline underline-offset-4" href="/api/rates">JSON</a> and <a className="font-semibold text-white underline underline-offset-4" href="/api/rates.csv">CSV</a> formats.</p>
        <p className="mt-5 text-xs text-slate-400">{lastUpdated ? `Last updated ${lastUpdated.toLocaleDateString("en-BD", { timeZone: "Asia/Dhaka", dateStyle: "long" })}` : "Rate sheet is being prepared."}</p>
      </div>
    </section>
    <section className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {rates.length ? <div className="overflow-x-auto"><table className="w-full min-w-[840px] border-collapse text-left text-sm">
          <caption className="sr-only">Current published international shipping rates from Bangladesh</caption>
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500"><tr><th scope="col" className="px-5 py-4 font-bold">Origin</th><th scope="col" className="px-5 py-4 font-bold">Destination</th><th scope="col" className="px-5 py-4 font-bold">Service</th><th scope="col" className="px-5 py-4 font-bold">Weight range</th><th scope="col" className="px-5 py-4 font-bold">Rate</th><th scope="col" className="px-5 py-4 font-bold">Notes</th></tr></thead>
          <tbody className="divide-y divide-slate-100">{rates.map((rate) => <tr key={rate.id} className="align-top"><td className="px-5 py-4 text-slate-700">{rate.origin}</td><td className="px-5 py-4 font-semibold text-slate-900">{rate.destination}</td><td className="px-5 py-4 text-slate-700">{rate.service}</td><td className="whitespace-nowrap px-5 py-4 tabular-nums text-slate-700">{Number(rate.minWeightKg).toLocaleString("en", { maximumFractionDigits: 2 })} kg{rate.maxWeightKg ? ` – ${Number(rate.maxWeightKg).toLocaleString("en", { maximumFractionDigits: 2 })} kg` : "+"}</td><td className="whitespace-nowrap px-5 py-4 font-bold tabular-nums text-slate-950">{rate.currency} {Number(rate.amount).toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td><td className="max-w-xs px-5 py-4 leading-6 text-slate-600">{rate.notes || "—"}</td></tr>)}</tbody>
        </table></div> : <div className="p-8 text-center sm:p-14"><p className="text-lg font-bold text-slate-900">Rates will be published here</p><p className="mt-2 text-sm leading-6 text-slate-600">Please contact our team for a route specific quote while our rate sheet is being prepared.</p><Link href="/contact" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#b81e46] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#94183a]">Contact us</Link></div>}
      </div>
      <p className="mx-auto mt-5 max-w-5xl text-xs leading-5 text-slate-500">Published rates are subject to service availability and shipment details. Additional carrier, fuel, customs, or handling charges may apply where noted. Contact us to confirm the applicable rate before booking.</p>
    </section>
  </main>;
}
