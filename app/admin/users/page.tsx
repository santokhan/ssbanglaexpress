import Link from "next/link";
import { prisma } from "@/lib/prisma";

type SearchParams = Promise<{ q?: string; page?: string }>;
const PAGE_SIZE = 25;

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim().slice(0, 100);
  const parsedPage = Number.parseInt(params.page ?? "1", 10);
  const requestedPage = Number.isFinite(parsedPage) && parsedPage > 0 ? parsedPage : 1;
  const where = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          { email: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  const total = await prisma.user.count({ where });
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(requestedPage, pageCount);
  const [customers, admins, users] = await Promise.all([
    prisma.user.count({ where: { ...where, role: "USER" } }),
    prisma.user.count({ where: { ...where, role: "ADMIN" } }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        avatarUrl: true,
        role: true,
        createdAt: true,
        _count: { select: { shipments: true, quoteRequests: true } },
      },
    }),
  ]);

  const pageHref = (nextPage: number) =>
    `/admin/users?${new URLSearchParams({ ...(query ? { q: query } : {}), page: String(nextPage) })}`;

  return (
    <main className="min-h-svh px-4 py-9 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Administration</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Users</h1>
          <p className="mt-2 text-sm text-slate-600">Browse registered customers and admin accounts.</p>
        </header>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <Stat label="Matching accounts" value={total} />
          <Stat label="Customers" value={customers} />
          <Stat label="Admins" value={admins} />
        </div>

        <form action="/admin/users" className="mt-7 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row">
          <label className="sr-only" htmlFor="user-search">Search users</label>
          <input
            id="user-search"
            name="q"
            defaultValue={query}
            placeholder="Search by name or email"
            className="min-w-0 flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46] focus:ring-2 focus:ring-[#b81e46]/10"
          />
          <button className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700">Search</button>
          {query && <Link href="/admin/users" className="self-center px-2 text-sm font-semibold text-slate-500 hover:text-slate-900">Clear</Link>}
        </form>

        <div className="mt-5 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Account directory</h2>
          <p className="text-sm text-slate-500">{total ? (page - 1) * PAGE_SIZE + 1 : 0}–{Math.min(page * PAGE_SIZE, total)} of {total}</p>
        </div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {users.length ? (
            <div className="divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user.id} className="grid gap-3 p-4 sm:grid-cols-[1.5fr_1.4fr_0.7fr_0.8fr_0.8fr] sm:items-center sm:px-5">
                  <div className="flex min-w-0 items-center gap-3">
                    {user.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={user.avatarUrl} alt="" className="h-10 w-10 rounded-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-50 text-sm font-bold text-[#a61940]">{user.name.slice(0, 1).toUpperCase()}</span>
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">{user.name}</p>
                      <p className="truncate text-sm text-slate-500">{user.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 sm:hidden">Joined</p>
                    <p className="text-sm text-slate-700">{user.createdAt.toLocaleDateString("en-BD", { dateStyle: "medium", timeZone: "Asia/Dhaka" })}</p>
                  </div>
                  <div><p className="text-xs text-slate-500">{user._count.shipments} shipments</p></div>
                  <div><p className="text-xs text-slate-500">{user._count.quoteRequests} quote requests</p></div>
                  <div><span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${user.role === "ADMIN" ? "bg-rose-50 text-[#a61940]" : "bg-slate-100 text-slate-700"}`}>{user.role === "ADMIN" ? "Admin" : "Customer"}</span></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="font-semibold text-slate-800">{query ? "No matching users" : "No user accounts yet"}</p>
              <p className="mt-1 text-sm text-slate-500">{query ? "Try another name or email address." : "Registered accounts will appear here."}</p>
            </div>
          )}
        </div>
        {pageCount > 1 && (
          <nav aria-label="User pages" className="mt-5 flex items-center justify-between">
            <span className="text-sm text-slate-500">Page {page} of {pageCount}</span>
            <div className="flex gap-2">
              {page > 1 && <Link href={pageHref(page - 1)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Previous</Link>}
              {page < pageCount && <Link href={pageHref(page + 1)} className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Next</Link>}
            </div>
          </nav>
        )}
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return <div className="rounded-xl border border-slate-200 bg-white p-4"><p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-slate-950">{value}</p></div>;
}
