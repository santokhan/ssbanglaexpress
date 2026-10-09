"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { isShipmentAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const statuses = ["BOOKED", "PICKUP_SCHEDULED", "PICKED_UP", "IN_TRANSIT", "CUSTOMS_CLEARANCE", "OUT_FOR_DELIVERY", "DELIVERED", "ON_HOLD", "CANCELLED", "EXCEPTION"] as const;

export async function updateShipmentStatus(formData: FormData) {
  const user = await getSessionUser();
  if (!user || !isShipmentAdmin(user)) throw new Error("Unauthorized");
  const shipmentId = String(formData.get("shipmentId") ?? "");
  const status = String(formData.get("status") ?? "");
  const description = String(formData.get("description") ?? "").trim().slice(0, 300);
  const location = String(formData.get("location") ?? "").trim().slice(0, 120);
  if (!shipmentId || !statuses.includes(status as (typeof statuses)[number]) || !description) throw new Error("Invalid shipment update");
  await prisma.$transaction(async (tx) => {
    const shipment = await tx.shipment.update({ where: { id: shipmentId }, data: { status: status as (typeof statuses)[number], ...(status === "DELIVERED" ? { deliveredAt: new Date() } : {}) } });
    await tx.shipmentEvent.create({ data: { shipmentId: shipment.id, status: status as (typeof statuses)[number], description, location: location || null } });
  });
  revalidatePath("/admin");
  revalidatePath("/admin/shipments");
  revalidatePath(`/admin/shipments/${shipmentId}`);
}
