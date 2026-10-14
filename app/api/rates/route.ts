import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const rates = await prisma.publicRate.findMany({ where: { active: true }, orderBy: [{ destination: "asc" }, { service: "asc" }, { minWeightKg: "asc" }] });
  const updatedAt = rates.reduce<Date | null>((latest, rate) => !latest || rate.updatedAt > latest ? rate.updatedAt : latest, null);
  return Response.json({
    publisher: "SS Bangla Express",
    currency_note: "Each row includes its own ISO 4217 currency code. Weight values are in kilograms.",
    updated_at: updatedAt?.toISOString() ?? null,
    fields: ["origin", "destination", "service", "min_weight_kg", "max_weight_kg", "rate", "currency", "notes"],
    rates: rates.map((rate) => ({ origin: rate.origin, destination: rate.destination, service: rate.service, min_weight_kg: Number(rate.minWeightKg), max_weight_kg: rate.maxWeightKg === null ? null : Number(rate.maxWeightKg), rate: Number(rate.amount), currency: rate.currency, notes: rate.notes })),
  }, { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } });
}
