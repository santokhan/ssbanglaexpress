import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function escapeCsv(value: string | number) {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export async function GET() {
  const rates = await prisma.publicRate.findMany({ where: { active: true }, orderBy: [{ destination: "asc" }, { service: "asc" }, { minWeightKg: "asc" }] });
  const lines = ["origin,destination,service,min_weight_kg,max_weight_kg,rate,currency,notes", ...rates.map((rate) => [rate.origin, rate.destination, rate.service, Number(rate.minWeightKg), rate.maxWeightKg === null ? "" : Number(rate.maxWeightKg), Number(rate.amount), rate.currency, rate.notes].map(escapeCsv).join(","))];
  return new Response(lines.join("\r\n"), { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": "attachment; filename=ss-bangla-shipping-rates.csv", "Cache-Control": "public, max-age=60, s-maxage=60" } });
}
