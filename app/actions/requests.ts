"use server";

import { randomUUID } from "node:crypto";
import { saveContactMessage, saveQuote, type ContactMessage, type QuoteRequest } from "@/lib/request-store";

type QuoteInput = Record<string, unknown> & { type?: unknown; consent?: unknown };
type ContactInput = Record<string, unknown>;
type ActionResult = { ok: true; id: string } | { ok: false; error: string };

const quoteFields = ["fullName", "email", "phone", "origin", "destination", "itemType", "weight", "cartons", "dimensions", "quantity", "sizeRange", "material", "targetPrice", "details"] as const;
const quoteLimits: Record<(typeof quoteFields)[number], number> = {
  fullName: 100, email: 254, phone: 30, origin: 80, destination: 80, itemType: 300,
  weight: 20, cartons: 20, dimensions: 80, quantity: 20, sizeRange: 120, material: 160, targetPrice: 80, details: 1500,
};

function normalizedFields<K extends string>(input: Record<string, unknown>, fields: readonly K[], limits: Record<K, number>) {
  const result = {} as Record<K, string>;
  for (const field of fields) {
    const value = typeof input[field] === "string" ? input[field].trim() : "";
    const key = field as K;
    if (value.length > limits[key]) return { error: `Please shorten the ${field} field.` };
    result[key] = value;
  }
  return { data: result };
}

export async function submitQuote(input: QuoteInput): Promise<ActionResult> {
  const type = input.type;
  if (type !== "shipping" && type !== "sourcing" && type !== "manufacturing") return { ok: false, error: "Choose a valid request type." };
  const normalized = normalizedFields(input, quoteFields, quoteLimits);
  if ("error" in normalized) return { ok: false, error: normalized.error ?? "Please check the submitted fields." };
  const data = normalized.data;
  const required = ["fullName", "email", "phone", "origin", "destination", "itemType", ...(type === "shipping" ? ["weight", "cartons"] : ["quantity"])];
  if (required.some((field) => !data[field as keyof typeof data])) return { ok: false, error: "Please complete all required fields." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) return { ok: false, error: "Enter a valid email address." };
  if (type === "shipping" && (!Number.isFinite(Number(data.weight)) || Number(data.weight) <= 0 || !Number.isInteger(Number(data.cartons)) || Number(data.cartons) < 1)) return { ok: false, error: "Enter a valid weight and carton count." };
  if (type !== "shipping" && (!Number.isInteger(Number(data.quantity)) || Number(data.quantity) < 1)) return { ok: false, error: "Enter a valid quantity." };
  if (input.consent !== true) return { ok: false, error: "Consent is required to submit a request." };

  const id = `SSB-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`;
  const quote: QuoteRequest = {
    id, type, receivedAt: new Date().toISOString(), fullName: data.fullName!, email: data.email!, phone: data.phone!,
    origin: data.origin!, destination: data.destination!, itemType: data.itemType!, weight: data.weight!,
    cartons: data.cartons!, dimensions: data.dimensions!, quantity: data.quantity!, sizeRange: data.sizeRange!,
    material: data.material!, targetPrice: data.targetPrice!, details: data.details!,
  };
  saveQuote(quote);
  return { ok: true, id };
}

const contactFields = ["firstName", "lastName", "email", "phone", "message"] as const;
const contactLimits: Record<(typeof contactFields)[number], number> = { firstName: 100, lastName: 100, email: 254, phone: 30, message: 3000 };

export async function submitContact(input: ContactInput): Promise<ActionResult> {
  const normalized = normalizedFields(input, contactFields, contactLimits);
  if ("error" in normalized) return { ok: false, error: normalized.error ?? "Please check the submitted fields." };
  const data = normalized.data;
  if (contactFields.some((field) => !data[field])) return { ok: false, error: "Please complete all required fields." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email!)) return { ok: false, error: "Enter a valid email address." };
  const id = `SSB-C-${randomUUID().slice(0, 8).toUpperCase()}`;
  const message: ContactMessage = { id, receivedAt: new Date().toISOString(), firstName: data.firstName!, lastName: data.lastName!, email: data.email!, phone: data.phone!, message: data.message! };
  saveContactMessage(message);
  return { ok: true, id };
}
