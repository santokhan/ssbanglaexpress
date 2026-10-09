import { prisma } from "@/lib/prisma";

const label = (value: string) => value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export default async function AdminQuotesPage() {
  const quotes = await prisma.quoteRequest.findMany({ orderBy: { receivedAt: "desc" } });
  return <main className="min-h-svh px-4 py-9 sm:px-8"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Operations</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Quote requests</h1><p className="mt-2 text-sm text-slate-600">Review incoming shipping and product quote enquiries.</p>
    <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{quotes.length ? <div className="divide-y divide-slate-100">{quotes.map((quote) => <article key={quote.id} className="grid gap-3 p-4 sm:grid-cols-[1fr_1.2fr_1fr_auto] sm:items-center sm:px-5"><div><p className="font-semibold text-slate-900">{quote.fullName}</p><p className="mt-1 text-sm text-slate-500">{quote.email} · {quote.phone}</p></div><div><p className="text-sm font-medium text-slate-800">{quote.origin} → {quote.destination}</p><p className="mt-1 text-xs text-slate-500">{label(quote.type)} · {quote.itemType}</p></div><p className="text-sm text-slate-600">Received {quote.receivedAt.toLocaleDateString("en-BD", { dateStyle: "medium", timeZone: "Asia/Dhaka" })}</p><span className="w-fit rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-[#a61940]">{label(quote.status)}</span><p className="text-sm text-slate-600 sm:col-span-4">{quote.details || "No additional details"}</p></article>)}</div> : <div className="p-12 text-center"><p className="font-semibold text-slate-800">No quote requests yet</p></div>}</div>
  </div></main>;
}
