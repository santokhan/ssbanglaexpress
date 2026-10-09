"use server";

import { getSessionUser } from "@/lib/auth";

export async function getCurrentUserAction() {
  return getSessionUser();
}
