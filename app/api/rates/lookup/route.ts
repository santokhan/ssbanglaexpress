import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const origin = params.get("origin")?.trim();
  const destination = params.get("destination")?.trim();
  const service = params.get("service")?.trim();
  const weightKg = Number(params.get("weight_kg"));

  if (!origin || !destination || !service || !Number.isFinite(weightKg) || weightKg <= 0) {
    return Response.json(
      { error: "Provide origin, destination, service, and a positive weight_kg." },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const matches = await prisma.publicRate.findMany({
    where: {
      active: true,
      origin: { equals: origin, mode: "insensitive" },
      destination: { equals: destination, mode: "insensitive" },
      service: { equals: service, mode: "insensitive" },
      minWeightKg: { lte: weightKg },
      OR: [{ maxWeightKg: null }, { maxWeightKg: { gte: weightKg } }],
    },
    orderBy: { minWeightKg: "desc" },
    take: 1,
    select: { amount: true, currency: true },
  });

  const match = matches[0];
  if (!match) {
    return Response.json(
      { error: "No rate found for the requested route, service, and weight." },
      { status: 404, headers: { "Cache-Control": "no-store" } },
    );
  }

  return Response.json(
    { rate: Number(match.amount), currency: match.currency },
    { headers: { "Cache-Control": "public, max-age=60, s-maxage=60" } },
  );
}
