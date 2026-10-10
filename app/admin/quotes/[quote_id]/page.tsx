import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

const label = (value: string) =>
  value.toLowerCase().replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

export default async function QuoteDetailPage({
  params,
}: {
  params: Promise<{ quote_id: string }>;
}) {
  const { quote_id } = await params;
  const quote = await prisma.quoteRequest.findUnique({
    where: { id: quote_id },
    include: { shipment: { select: { id: true, trackingNumber: true, status: true } } },
  });

  if (!quote) notFound();

  const date = quote.receivedAt.toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  });
  const isShipping = quote.type === "shipping";
  const whatsappNumber = quote.phone.replace(/\D/g, "").replace(/^00/, "");
  const whatsappPhone = whatsappNumber.startsWith("0")
    ? `880${whatsappNumber.slice(1)}`
    : whatsappNumber;
  const whatsappHref = whatsappPhone.length >= 8
    ? `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(`Hello ${quote.fullName}, we received your ${label(quote.type).toLowerCase()} quote request (${quote.id}). How can we help?`)}`
    : null;

  return (
    <main className="min-h-svh px-4 py-9 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link href="/admin/quotes" className="text-sm font-semibold text-[#a61940] hover:underline">
          ← All quote requests
        </Link>

        <header className="mt-5 flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-start sm:p-7">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[.18em] text-slate-400">
              {label(quote.type)} quote request
            </p>
            <h1 className="mt-2 break-all font-mono text-2xl font-bold tracking-wide text-slate-950 sm:text-3xl">
              {quote.id}
            </h1>
            <p className="mt-2 text-sm text-slate-500">Received {date}</p>
          </div>
          <span className="w-fit rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-[#a61940]">
            {label(quote.status)}
          </span>
        </header>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" id="app-admin-quotes-quote-id-page-section-1">
            <h2 className="text-lg font-bold text-slate-900">Request details</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Info title="Request type" value={label(quote.type)} />
              <Info title="Item or service" value={quote.itemType} />
              <Info title="Origin" value={quote.origin} />
              <Info title="Destination" value={quote.destination} />
              {isShipping ? (
                <>
                  <Info title="Weight" value={quote.weight ? `${quote.weight} kg` : "Not provided"} />
                  <Info title="Cartons" value={quote.cartons} />
                  <Info title="Dimensions" value={quote.dimensions} />
                </>
              ) : (
                <>
                  <Info title="Quantity" value={quote.quantity} />
                  <Info title="Size range" value={quote.sizeRange} />
                  <Info title="Material" value={quote.material} />
                  <Info title="Target price" value={quote.targetPrice} />
                </>
              )}
            </div>
            <div className="mt-6 border-t border-slate-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-slate-400">Additional details</h3>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                {quote.details || "No additional details provided."}
              </p>
            </div>
          </section>

          <div className="space-y-5">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" id="app-admin-quotes-quote-id-page-section-2">
              <h2 className="text-lg font-bold text-slate-900">Customer</h2>
              <div className="mt-5 space-y-4">
                <Info title="Name" value={quote.fullName} />
                <Info title="Email" value={quote.email} href={`mailto:${quote.email}`} />
                <Info title="Phone" value={quote.phone} href={`tel:${quote.phone}`} />
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">WhatsApp</p>
                  {whatsappHref ? (
                    <>
                      <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-10 items-center justify-center rounded-lg bg-[#25d366] px-4 text-sm font-bold text-white transition hover:bg-[#1fb85a]">
                        Try WhatsApp
                      </a>
                      <p className="mt-2 text-xs leading-5 text-slate-500">Opens a chat to the submitted number with a draft message. WhatsApp availability isn&apos;t confirmed; send the message in WhatsApp.</p>
                    </>
                  ) : (
                    <p className="mt-1 text-sm text-slate-500">A valid phone number wasn&apos;t provided.</p>
                  )}
                </div>
              </div>
            </section>

            {quote.shipment && (
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6" id="app-admin-quotes-quote-id-page-section-3">
                <h2 className="text-lg font-bold text-slate-900">Linked shipment</h2>
                <Link href={`/admin/shipments/${quote.shipment.id}`} className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-4 transition hover:bg-slate-100">
                  <span>
                    <span className="block font-mono text-sm font-bold text-[#a61940]">{quote.shipment.trackingNumber}</span>
                    <span className="mt-1 block text-xs text-slate-500">{label(quote.shipment.status)}</span>
                  </span>
                  <span aria-hidden="true" className="text-slate-400">→</span>
                </Link>
              </section>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ title, value, href }: { title: string; value: string; href?: string }) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{title}</p>
      {href ? (
        <a href={href} className="mt-1 block break-words text-sm font-semibold text-[#a61940] hover:underline">{value || "Not provided"}</a>
      ) : (
        <p className="mt-1 break-words text-sm font-semibold text-slate-800">{value || "Not provided"}</p>
      )}
    </div>
  );
}
