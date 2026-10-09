import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getSessionUser } from "@/lib/auth";
import { isShipmentAdmin } from "@/lib/admin";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import AdminNavigation from "@/components/admin/AdminNavigation";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await getSessionUser();
  if (!user) redirect("/auth/signin");
  if (!isShipmentAdmin(user)) redirect("/");
  return (
    <div className="min-h-svh bg-slate-50">
      <header className="w-full border-b border-slate-200 bg-white">
        <div className="flex min-h-16 w-full items-center justify-between px-4 sm:px-8 lg:px-12">
          <Link href="/admin" aria-label="SS Bangla Express admin home" className="shrink-0">
            <Logo className="h-10 w-auto" />
          </Link>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm font-semibold text-slate-600 sm:inline">Shipment operations</span>
            <Link href="/" className="text-sm font-semibold text-[#a61940] hover:underline">View website</Link>
          </div>
        </div>
      </header>
      <AdminNavigation />
      {children}
    </div>
  );
}
