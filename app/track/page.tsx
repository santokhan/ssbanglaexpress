import type { Metadata } from "next";
import Link from "next/link";
import { PackageCheck, Search } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Track a Shipment | SS Bangla Express",
  description: "Check the latest status and tracking history for your shipment.",
};

const label = (value: string) =>
  value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

const date = (value: Date) =>
  value.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  });

export default async function TrackShipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ tracking?: string }>;
}) {
  const { tracking: rawTracking } = await searchParams;
  const tracking = (rawTracking ?? "").trim().toUpperCase().slice(0, 40);
  const shipment = tracking
    ? await prisma.shipment.findUnique({
        where: { trackingNumber: tracking },
        select: {
          trackingNumber: true,
          serviceType: true,
          status: true,
          origin: true,
          destination: true,
          bookedAt: true,
          estimatedDelivery: true,
          deliveredAt: true,
          trackingEvents: {
            orderBy: { occurredAt: "desc" },
            select: { status: true, description: true, location: true, occurredAt: true },
          },
        },
      })
    : null;

  return (
    <main className="min-h-[var(--height-main)] bg-slate-50 px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-rose-50 text-[#b81e46]"><PackageCheck size={27} /></span>
          <p className="mt-5 text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Shipment tracking</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">Track your shipment</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600">Enter the tracking number from your booking confirmation to see the latest status and updates.</p>
        </header>

        <form action="/track" method="get" className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row">
          <label htmlFor="tracking-number" className="sr-only">Tracking number</label>
          <input
            id="tracking-number"
            name="tracking"
            defaultValue={tracking}
            autoComplete="off"
            maxLength={40}
            placeholder="e.g. SSB261009ABC123"
            className="min-h-12 min-w-0 flex-1 rounded-xl border border-slate-200 px-4 font-mono text-sm uppercase text-slate-900 outline-none placeholder:font-sans placeholder:normal-case focus:border-[#b81e46] focus:ring-2 focus:ring-[#b81e46]/10"
          />
          <button className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b81e46] px-6 text-sm font-bold text-white transition hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]">
            <Search size={17} /> Track shipment
          </button>
        </form>

        {tracking && !shipment && (
          <section aria-live="polite" className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-center">
            <h2 className="font-bold text-slate-900">We couldn’t find that tracking number</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">Check the number and try again. If you need help, <Link href="/contact" className="font-semibold text-[#a61940] underline underline-offset-2">contact our team</Link>.</p>
          </section>
        )}

        {shipment && (
          <div className="mt-7 space-y-5" aria-live="polite">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-slate-400">Tracking number</p>
                  <h2 className="mt-1 font-mono text-xl font-bold tracking-wide text-[#a61940]">{shipment.trackingNumber}</h2>
                </div>
                <span className="w-fit rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-[#a61940]">{label(shipment.status)}</span>
              </div>
              <p className="mt-5 text-xl font-semibold text-slate-900">{shipment.origin} <span className="text-slate-400">→</span> {shipment.destination}</p>
              <p className="mt-1 text-sm text-slate-500">{shipment.serviceType} · Booked {date(shipment.bookedAt)}</p>
              {shipment.estimatedDelivery && <p className="mt-3 text-sm text-slate-600">Estimated delivery: <span className="font-semibold text-slate-800">{date(shipment.estimatedDelivery)}</span></p>}
              {shipment.deliveredAt && <p className="mt-3 text-sm text-emerald-700">Delivered {date(shipment.deliveredAt)}</p>}
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7" aria-labelledby="tracking-history-heading">
              <h2 id="tracking-history-heading" className="text-lg font-bold text-slate-900">Tracking history</h2>
              {shipment.trackingEvents.length ? (
                <ol className="mt-5 space-y-0">
                  {shipment.trackingEvents.map((event, index) => (
                    <li key={`${event.occurredAt.toISOString()}-${index}`} className="relative flex gap-4 pb-6 last:pb-0">
                      {index < shipment.trackingEvents.length - 1 && <span aria-hidden="true" className="absolute left-[7px] top-4 h-full w-px bg-slate-200" />}
                      <span aria-hidden="true" className={`relative mt-1.5 size-4 shrink-0 rounded-full border-[3px] border-white ring-1 ${index === 0 ? "bg-[#b81e46] ring-[#b81e46]" : "bg-slate-300 ring-slate-300"}`} />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900">{label(event.status)}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{event.description}</p>
                        <p className="mt-1 text-xs text-slate-400">{event.location ? `${event.location} · ` : ""}{date(event.occurredAt)}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-3 text-sm text-slate-500">No tracking updates have been recorded yet.</p>
              )}
            </section>
          </div>
        )}

        <p className="mt-7 text-center text-sm text-slate-500">Need help with your delivery? <Link href="/contact" className="font-semibold text-[#a61940] underline-offset-2 hover:underline">Contact our team</Link>.</p>
      </div>
    </main>
  );
}
