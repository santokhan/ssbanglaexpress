"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { enqueueEmail } from "@/lib/email-queue";

const fields = ["customerName", "customerEmail", "customerPhone", "origin", "destination", "pickupAddress", "deliveryAddress", "serviceType", "productType", "packageDescription", "weight", "cartons", "specialInstructions"] as const;
const limits: Record<(typeof fields)[number], number> = { customerName: 100, customerEmail: 254, customerPhone: 30, origin: 80, destination: 80, pickupAddress: 500, deliveryAddress: 500, serviceType: 50, productType: 100, packageDescription: 500, weight: 20, cartons: 5, specialInstructions: 1000 };

export async function createShipmentBooking(formData: FormData) {
  const data = Object.fromEntries(fields.map((key) => [key, String(formData.get(key) ?? "").trim()]));
  if (fields.some((key) => !data[key]) || Object.entries(data).some(([key, value]) => value.length > limits[key as keyof typeof limits])) redirect("/book?error=details");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.customerEmail)) redirect("/book?error=email");
  const weight = Number(data.weight);
  const cartons = Number(data.cartons);
  if (!Number.isFinite(weight) || weight <= 0 || !Number.isInteger(cartons) || cartons < 1 || !["International Express", "Air Cargo", "Sea Cargo"].includes(data.serviceType)) redirect("/book?error=details");

  const user = await getSessionUser();
  const trackingNumber = `SSB${new Date().toISOString().slice(2, 10).replaceAll("-", "")}${randomUUID().slice(0, 6).toUpperCase()}`;
  try {
    await prisma.$transaction(async (tx) => {
      await tx.shipment.create({ data: {
      trackingNumber, userId: user?.id, customerName: data.customerName, customerEmail: data.customerEmail.toLowerCase(), customerPhone: data.customerPhone,
      serviceType: data.serviceType, origin: data.origin, destination: data.destination, pickupAddress: data.pickupAddress, deliveryAddress: data.deliveryAddress,
      productType: data.productType, packageDescription: data.packageDescription, weight, weightUnit: "kg", cartons, specialInstructions: data.specialInstructions,
      status: "BOOKED", trackingEvents: { create: { status: "BOOKED", description: "Booking received. Our team will review pickup and delivery details." } },
      } });
      await enqueueEmail(tx, "SHIPMENT_BOOKING", {
        to: data.customerEmail.toLowerCase(), customerName: data.customerName, trackingNumber,
        serviceType: data.serviceType, origin: data.origin, destination: data.destination,
        productType: data.productType, packageDescription: data.packageDescription, weight, cartons,
      });
    });
  } catch (error) {
    console.error("Shipment booking failed", error);
    redirect("/book?error=save");
  }
  redirect(`/book?tracking=${encodeURIComponent(trackingNumber)}`);
}
