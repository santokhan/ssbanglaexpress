import Link from "next/link";
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
type SearchParams = Promise<{ q?: string; status?: string }>;

export default async function AdminShipmentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 100);
  const status = statuses.find((candidate) => candidate === params.status);
  const where = {
    ...(status ? { status } : {}),
    ...(query
      ? {
          OR: [
            {
              trackingNumber: { contains: query, mode: "insensitive" as const },
            },
            { customerName: { contains: query, mode: "insensitive" as const } },
            {
              customerEmail: { contains: query, mode: "insensitive" as const },
            },
            { origin: { contains: query, mode: "insensitive" as const } },
            { destination: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
  };
  const [shipments, total, active, delivered] = await Promise.all([
    prisma.shipment.findMany({
      where,
      orderBy: { bookedAt: "desc" },
      include: { trackingEvents: { orderBy: { occurredAt: "desc" }, take: 1 } },
    }),
    prisma.shipment.count(),
    prisma.shipment.count({
      where: { status: { notIn: ["DELIVERED", "CANCELLED"] } },
    }),
    prisma.shipment.count({ where: { status: "DELIVERED" } }),
  ]);

  return (
    <main className="min-h-svh px-4 py-9 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">
              Operations
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              Shipments
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Review bookings, follow progress, and add tracking updates.
            </p>
          </div>
          <Link
            href="/book"
            className="inline-flex w-fit items-center rounded-lg bg-[#a61940] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#861533]"
          >
            ＋ New booking
          </Link>
        </header>
        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label="All shipments" value={total} />
          <Stat label="In progress" value={active} />
          <Stat label="Delivered" value={delivered} />
        </div>
        <form
          action="/admin/shipments"
          className="mt-7 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row"
        >
          <label className="sr-only" htmlFor="shipment-search">
            Search shipments
          </label>
          <input
            id="shipment-search"
            name="q"
            defaultValue={query}
            placeholder="Search tracking number, customer, or route"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46] focus:ring-2 focus:ring-[#b81e46]/10"
          />
          <label className="sr-only" htmlFor="shipment-status">
            Filter by status
          </label>
          <select
            id="shipment-status"
            name="status"
            defaultValue={status ?? ""}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm"
          >
            <option value="">All statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>
                {label(item)}
              </option>
            ))}
          </select>
          <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">
            Search
          </button>
          {(query || status) && (
            <Link
              href="/admin/shipments"
              className="self-center px-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
            >
              Clear
            </Link>
          )}
        </form>
        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Booking list</h2>
          <p className="text-sm text-slate-500">
            {shipments.length}
            {shipments.length !== total ? ` of ${total}` : ""} shipments
          </p>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {shipments.length ? (
            <div className="divide-y divide-slate-100">
              {shipments.map((shipment) => (
                <Link
                  key={shipment.id}
                  href={`/admin/shipments/${shipment.id}`}
                  className="grid gap-3 p-4 transition hover:bg-slate-50 sm:grid-cols-[1.2fr_1.3fr_1fr_1fr_auto] sm:items-center sm:px-5"
                >
                  <div>
                    <p className="font-mono text-sm font-bold text-[#a61940]">
                      {shipment.trackingNumber}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">
                      {shipment.customerName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-800">
                      {shipment.origin}{" "}
                      <span className="text-slate-400">→</span>{" "}
                      {shipment.destination}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {shipment.serviceType}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Booked
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {shipment.bookedAt.toLocaleDateString("en-BD", {
                        dateStyle: "medium",
                        timeZone: "Asia/Dhaka",
                      })}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex rounded-full bg-rose-50 px-2.5 py-1 text-xs font-bold text-[#a61940]">
                      {label(shipment.status)}
                    </span>
                    <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                      {shipment.trackingEvents[0]?.description ??
                        "No updates yet"}
                    </p>
                  </div>
                  <span
                    className="hidden text-sm font-bold text-slate-400 sm:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="font-semibold text-slate-800">
                {total ? "No matching shipments" : "No shipment bookings yet"}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {total
                  ? "Try another search or clear your filters."
                  : "New customer bookings will appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
