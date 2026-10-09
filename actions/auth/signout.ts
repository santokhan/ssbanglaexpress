"use server";

import { clearSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function signoutAction(): Promise<never> {
  await clearSession();
  redirect("/auth/signin");
}
