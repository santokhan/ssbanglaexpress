import Link from "next/link";
import { notFound } from "next/navigation";
import { updateShipmentStatus } from "@/app/admin/actions";
import { prisma } from "@/lib/prisma";

const statuses = [
  "BOOKED",
  "PICKUP_SCHEDULED",
  "PICKED_UP",
  "IN_TRANSIT",
  "CUSTOMS_CLEARANCE",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "ON_HOLD",
  "CANCELLED",
  "EXCEPTION",
] as const;
const label = (value: string) =>
  value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
const input =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:border-[#b81e46] focus:ring-2 focus:ring-[#b81e46]/10";

export default async function ShipmentDetailPage({
  params,
}: {
  params: Promise<{ shipment_id: string }>;
}) {
  const { shipment_id } = await params;
  const shipment = await prisma.shipment.findUnique({
    where: { id: shipment_id },
    include: {
      trackingEvents: { orderBy: { occurredAt: "desc" } },
      payments: { orderBy: { createdAt: "desc" } },
    },
  });
  if (!shipment) notFound();
  const date = (value: Date) =>
    value.toLocaleString("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Dhaka",
    });

  return (
    <main className="min-h-svh px-4 py-9 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin/shipments"
          className="text-sm font-semibold text-[#a61940] hover:underline"
        >
          ← All shipments
        </Link>
        <header className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:p-7">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">
              Shipment details
            </p>
            <h1 className="mt-2 font-mono text-2xl font-bold tracking-wide text-[#a61940]">
              {shipment.trackingNumber}
            </h1>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {shipment.origin} <span className="text-slate-400">→</span>{" "}
              {shipment.destination}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {shipment.serviceType} · Booked {date(shipment.bookedAt)}
            </p>
          </div>
          <span className="w-fit rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-[#a61940]">
            {label(shipment.status)}
          </span>
        </header>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Booking information
            </h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Info
                title="Customer"
                lines={[
                  shipment.customerName,
                  shipment.customerEmail,
                  shipment.customerPhone,
                ]}
              />
              <Info
                title="Parcel"
                lines={[
                  shipment.packageDescription,
                  `${shipment.weight?.toString() ?? "—"} ${shipment.weightUnit} · ${shipment.cartons} cartons`,
                ]}
              />
              <Info title="Pickup address" lines={[shipment.pickupAddress]} />
              <Info
                title="Delivery address"
                lines={[shipment.deliveryAddress]}
              />
            </div>
            {shipment.specialInstructions && (
              <div className="mt-5 rounded-xl bg-amber-50 p-4 text-sm text-amber-900">
                <p className="text-xs font-bold uppercase tracking-wide">
                  Special instructions
                </p>
                <p className="mt-1 whitespace-pre-line">
                  {shipment.specialInstructions}
                </p>
              </div>
            )}
            <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
              <Info
                title="Estimated delivery"
                lines={[
                  shipment.estimatedDelivery
                    ? date(shipment.estimatedDelivery)
                    : "Not set",
                ]}
              />
              <Info
                title="Delivered"
                lines={[
                  shipment.deliveredAt
                    ? date(shipment.deliveredAt)
                    : "Not delivered",
                ]}
              />
            </div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">
              Add tracking update
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              The new status and update will appear in the tracking history.
            </p>
            <form action={updateShipmentStatus} className="mt-5 space-y-4">
              <input type="hidden" name="shipmentId" value={shipment.id} />
              <label className="block text-sm font-semibold text-slate-700">
                Status
                <select
                  name="status"
                  defaultValue={shipment.status}
                  className={`${input} mt-1.5`}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {label(status)}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Update description
                <textarea
                  name="description"
                  required
                  maxLength={300}
                  rows={3}
                  placeholder="Describe what happened"
                  className={`${input} mt-1.5`}
                />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Location{" "}
                <span className="font-normal text-slate-400">(optional)</span>
                <input
                  name="location"
                  maxLength={120}
                  placeholder="City, facility, or country"
                  className={`${input} mt-1.5`}
                />
              </label>
              <button className="w-full rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-700">
                Save tracking update
              </button>
            </form>
          </section>
        </div>
        <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Tracking history
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {shipment.trackingEvents.length}{" "}
                {shipment.trackingEvents.length === 1 ? "update" : "updates"}
              </p>
            </div>
          </div>
          {shipment.trackingEvents.length ? (
            <ol className="mt-6">
              {shipment.trackingEvents.map((event, index) => (
                <li
                  key={event.id}
                  className="relative flex gap-4 pb-6 last:pb-0"
                >
                  <div className="relative flex w-4 shrink-0 justify-center">
                    <span
                      className={`mt-1.5 h-3 w-3 rounded-full ring-4 ring-white ${index === 0 ? "bg-[#b81e46]" : "bg-slate-300"}`}
                    />
                    {index !== shipment.trackingEvents.length - 1 && (
                      <span className="absolute bottom-0 top-5 w-px bg-slate-200" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                      <p className="font-semibold text-slate-900">
                        {label(event.status)}
                      </p>
                      <time className="text-xs text-slate-500">
                        {date(event.occurredAt)}
                      </time>
                    </div>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {event.description}
                    </p>
                    {event.location && (
                      <p className="mt-1 text-xs font-medium text-slate-500">
                        {event.location}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No tracking updates have been recorded.
            </p>
          )}
        </section>
        {shipment.payments.length > 0 && (
          <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="text-lg font-bold text-slate-900">Payments</h2>
            <div className="mt-4 divide-y divide-slate-100">
              {shipment.payments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between gap-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-slate-800">
                      {payment.provider} · {label(payment.status)}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {payment.providerReference ?? "No reference"}
                    </p>
                  </div>
                  <p className="font-bold text-slate-900">
                    {payment.currency} {payment.amount.toString()}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function Info({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
        {title}
      </p>
      {lines.map((line, index) => (
        <p
          key={index}
          className={`mt-1 break-words text-sm ${index === 0 ? "font-semibold text-slate-800" : "text-slate-600"}`}
        >
          {line || "—"}
        </p>
      ))}
    </div>
  );
}
