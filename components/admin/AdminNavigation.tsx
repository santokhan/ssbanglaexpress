"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/shipments", label: "Shipments" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/quotes", label: "Quote requests" },
  { href: "/admin/rates", label: "Shipping rates" },
  { href: "/admin/chats", label: "Support chats" },
  { href: "/admin/messages", label: "Contact messages" },
];

export default function AdminNavigation() {
  const pathname = usePathname();
  return (
    <nav className="w-full overflow-x-auto border-b border-slate-200 bg-white" aria-label="Admin navigation">
      <div className="flex min-w-max items-center gap-1 px-4 sm:px-8 lg:px-12">
        {links.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(`${href}/`);
          return <Link key={href} href={href} aria-current={active ? "page" : undefined} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold ${active ? "border-[#a61940] text-[#a61940]" : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-950"}`}>{label}</Link>;
        })}
      </div>
    </nav>
  );
}
