"use server";

import { OAuth2Client } from "google-auth-library";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type GoogleSignInResult = { ok: true } | { ok: false; message: string };

const googleClient = new OAuth2Client();

export async function signInWithGoogle(credential: unknown): Promise<GoogleSignInResult> {
  const audience = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (typeof credential !== "string" || !audience) {
    return { ok: false, message: "Google sign-in is not configured." };
  }

  let claims;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience });
    claims = ticket.getPayload();
  } catch (error) {
    console.error("Google credential verification failed", error);
    return { ok: false, message: "Google could not verify your sign-in. Please try again." };
  }

  if (!claims?.sub || !claims.email || claims.email_verified !== true) {
    return { ok: false, message: "Google did not return a verified email." };
  }

  try {
    const email = claims.email.toLowerCase();
    let user = await prisma.user.findUnique({ where: { googleId: claims.sub } });
    if (!user) {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing?.googleId && existing.googleId !== claims.sub) {
        return { ok: false, message: "This email is linked to another Google account." };
      }
      user = existing
        ? await prisma.user.update({ where: { id: existing.id }, data: { googleId: claims.sub, name: existing.name || claims.name || email } })
        : await prisma.user.create({ data: { email, name: claims.name || email, googleId: claims.sub } });
    }

    await createSession(user.id, await headers());
  } catch (error) {
    console.error("Google sign-in failed", error);
    return { ok: false, message: "Unable to sign in right now. Please try again." };
  }

  redirect("/profile");
}
