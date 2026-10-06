export type QuoteRequest = {
  id: string; type: "shipping" | "sourcing" | "manufacturing"; receivedAt: string;
  fullName: string; email: string; phone: string; origin: string; destination: string; itemType: string;
  weight: string; cartons: string; dimensions: string; quantity: string; sizeRange: string; material: string; targetPrice: string; details: string;
};

export type ContactMessage = { id: string; receivedAt: string; firstName: string; lastName: string; email: string; phone: string; message: string };

type RequestRuntime = typeof globalThis & { __ssBanglaQuotes?: Map<string, QuoteRequest>; __ssBanglaContacts?: Map<string, ContactMessage> };
const runtime = globalThis as RequestRuntime;
const quotes = runtime.__ssBanglaQuotes ??= new Map();
const contacts = runtime.__ssBanglaContacts ??= new Map();

export function saveQuote(request: QuoteRequest) { quotes.set(request.id, request); }
export function listQuotes() { return [...quotes.values()].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)); }
export function saveContactMessage(message: ContactMessage) { contacts.set(message.id, message); }
export function listContactMessages() { return [...contacts.values()].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)); }
