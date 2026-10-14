import { prisma } from "@/lib/prisma";
import RateCsvUpload from "@/components/admin/RateCsvUpload";

export const dynamic = "force-dynamic";

export default async function AdminRatesPage() {
  const [rates, updated] = await Promise.all([
    prisma.publicRate.count({ where: { active: true } }),
    prisma.publicRate.findFirst({ where: { active: true }, orderBy: { updatedAt: "desc" }, select: { updatedAt: true } }),
  ]);
  return <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-8">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Website content</p>
    <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Public shipping rates</h1>
    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Upload a CSV to publish the latest rate table. The current published sheet contains <strong>{rates}</strong> rate rows{updated ? ` and was last updated ${updated.updatedAt.toLocaleString("en-BD", { timeZone: "Asia/Dhaka", dateStyle: "medium", timeStyle: "short" })}.` : "."}</p>
    <RateCsvUpload />
    <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <h2 className="font-bold text-slate-900">CSV columns</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">Use these exact headers: <code className="break-all rounded bg-slate-100 px-1.5 py-1 text-xs">origin,destination,service,min_weight_kg,max_weight_kg,rate,currency,notes</code></p>
      <a href="/rates-template.csv" download className="mt-3 inline-flex text-sm font-semibold text-[#a61940] underline underline-offset-4">Download CSV template</a>
      <p className="mt-3 text-sm leading-6 text-slate-600">One row per weight tier. Leave <code className="rounded bg-slate-100 px-1">max_weight_kg</code> blank for an open-ended tier. The rate is the amount for that tier, not an automatic per-kilogram calculation.</p>
      <a href="/api/rates.csv" className="mt-4 inline-flex text-sm font-semibold text-[#a61940] underline underline-offset-4">Download current published rates as CSV</a>
    </section>
  </main>;
}
