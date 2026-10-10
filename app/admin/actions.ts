"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth";
import { isShipmentAdmin, isSuperAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

const statuses = ["BOOKED", "PICKUP_SCHEDULED", "PICKED_UP", "IN_TRANSIT", "CUSTOMS_CLEARANCE", "OUT_FOR_DELIVERY", "DELIVERED", "ON_HOLD", "CANCELLED", "EXCEPTION"] as const;

export async function setUserRole(formData: FormData) {
  const actor = await getSessionUser();
  if (!actor || !isSuperAdmin(actor)) throw new Error("Unauthorized");

  const userId = String(formData.get("userId") ?? "");
  const role = String(formData.get("role") ?? "");
  if (!userId || !["USER", "ADMIN", "SUPERADMIN"].includes(role)) {
    throw new Error("Invalid role update");
  }
  if (userId === actor.id) throw new Error("You cannot change your own role");

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, role: true } });
  if (!target) throw new Error("User not found");
  if (target.role === "SUPERADMIN" && role !== "SUPERADMIN") {
    const superadminCount = await prisma.user.count({ where: { role: "SUPERADMIN" } });
    if (superadminCount <= 1) throw new Error("The last superadmin cannot be demoted");
  }

  await prisma.user.update({ where: { id: userId }, data: { role: role as "USER" | "ADMIN" | "SUPERADMIN" } });
  revalidatePath("/admin/users");
}

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
