"use server";

import { compare } from "bcryptjs";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type AuthActionResult = { ok: true } | { ok: false; message: string };

const invalidCredentials = "Invalid email or password.";

export async function signinAction(input: unknown): Promise<AuthActionResult> {
  if (!input || typeof input !== "object") return { ok: false, message: "Enter your email and password." };
  const values = input as Record<string, unknown>;
  const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
  const password = typeof values.password === "string" ? values.password : "";
  if (!email || email.length > 254 || !password || Buffer.byteLength(password, "utf8") > 72) {
    return { ok: false, message: "Enter your email and password." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.passwordHash || !(await compare(password, user.passwordHash))) {
      return { ok: false, message: invalidCredentials };
    }
    await createSession(user.id, await headers());
  } catch (error) {
    console.error("Signin failed", error);
    return { ok: false, message: "Unable to sign in right now. Please try again." };
  }

  redirect("/profile");
}
