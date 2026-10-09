"use server";

import { hash } from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { AuthActionResult } from "@/actions/auth/signin";

export async function signupAction(input: unknown): Promise<AuthActionResult> {
  if (!input || typeof input !== "object") return { ok: false, message: "Enter a valid name, email, and password." };
  const values = input as Record<string, unknown>;
  const name = typeof values.name === "string" ? values.name.trim() : "";
  const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
  const password = typeof values.password === "string" ? values.password : "";

  if (!name || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return { ok: false, message: "Enter a valid name and email, and a password between 8 and 72 bytes." };
  }

  try {
    const passwordHash = await hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true },
    });
    await createSession(user.id, await headers());
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return { ok: false, message: "An account with this email already exists." };
    }
    console.error("Signup failed", error);
    return { ok: false, message: "Unable to create your account. Please try again." };
  }

  redirect("/profile");
}
