"use server";

import { createHash, randomBytes } from "node:crypto";
import { hash } from "bcryptjs";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { enqueueEmail } from "@/lib/email-queue";

type ActionResult = { ok: true } | { ok: false; message: string };
const genericRequestSuccess: ActionResult = { ok: true };
const genericRequestFailure: ActionResult = { ok: false, message: "We could not process your request. Please try again later." };
const tokenDigest = (token: string) => createHash("sha256").update(token).digest("hex");

export async function requestPasswordReset(emailInput: unknown): Promise<ActionResult> {
  const email = typeof emailInput === "string" ? emailInput.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return { ok: false, message: "Enter a valid email address." };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email }, select: { id: true, passwordHash: true } });
    // Always return the same result for unknown addresses and Google-only accounts.
    if (!user?.passwordHash) return genericRequestSuccess;

    const token = randomBytes(32).toString("base64url");
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
    const requestHeaders = await headers();
    const requestOrigin = requestHeaders.get("origin");
    const requestHost = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
    if (!requestOrigin && !requestHost) throw new Error("Could not determine the request host for the password reset link.");
    const siteOrigin = requestOrigin
      ?? `${requestHeaders.get("x-forwarded-proto") ?? "https"}://${requestHost}`;
    const resetUrl = new URL("/auth/reset-password", siteOrigin);
    if (resetUrl.protocol !== "https:" && resetUrl.hostname !== "localhost") {
      throw new Error("Password reset links must use HTTPS outside localhost.");
    }
    resetUrl.searchParams.set("token", token);
    await prisma.$transaction(async (tx) => {
      await tx.passwordResetToken.deleteMany({ where: { userId: user.id } });
      await tx.passwordResetToken.create({ data: { tokenHash: tokenDigest(token), userId: user.id, expiresAt } });
      await enqueueEmail(tx, "PASSWORD_RESET", { to: email, resetUrl: resetUrl.toString() });
    });
    return genericRequestSuccess;
  } catch (error) {
    console.error("Password reset email request failed", error);
    return genericRequestFailure;
  }
}

export async function resetPassword(input: unknown): Promise<ActionResult> {
  if (!input || typeof input !== "object") return { ok: false, message: "This reset link is invalid." };
  const values = input as Record<string, unknown>;
  const token = typeof values.token === "string" ? values.token.trim() : "";
  const password = typeof values.password === "string" ? values.password : "";
  if (!token || token.length > 128 || password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    return { ok: false, message: "Enter a valid reset link and a password between 8 and 72 bytes." };
  }

  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { tokenHash: tokenDigest(token) },
      select: { id: true, userId: true, expiresAt: true },
    });
    if (!resetToken || resetToken.expiresAt <= new Date()) {
      return { ok: false, message: "This reset link may have expired. Request a new link and try again." };
    }

    const passwordHash = await hash(password, 12);
    const used = await prisma.$transaction(async (tx) => {
      const claimed = await tx.passwordResetToken.deleteMany({
        where: { id: resetToken.id, expiresAt: { gt: new Date() } },
      });
      if (claimed.count !== 1) return false;
      await tx.user.update({ where: { id: resetToken.userId }, data: { passwordHash } });
      await tx.userSession.updateMany({
        where: { userId: resetToken.userId, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      return true;
    });

    return used
      ? { ok: true }
      : { ok: false, message: "This reset link may have expired. Request a new link and try again." };
  } catch (error) {
    console.error("Password reset failed", error);
    return { ok: false, message: "We could not reset your password. Please try again." };
  }
}
