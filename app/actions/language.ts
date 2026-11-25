"use server";

import { cookies } from "next/headers";

export type SiteLanguage = "en" | "bn";

export async function setPreferredLanguage(language: unknown): Promise<void> {
  if (language !== "en" && language !== "bn") {
    throw new Error("Unsupported language.");
  }

  const cookieStore = await cookies();
  const cookieOptions = {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };

  cookieStore.set("site-language", language, cookieOptions);

  if (language === "bn") {
    cookieStore.set("googtrans", "/en/bn", cookieOptions);
  } else {
    cookieStore.delete("googtrans");
  }
}
