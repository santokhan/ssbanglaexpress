import AdminChats from "@/components/admin/AdminChats";

export default function AdminChatsPage() {
  return <main className="min-h-svh px-4 py-9 sm:px-8"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Operations</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Support chats</h1><p className="mt-2 text-sm text-slate-600">Reply to customer conversations from your support inbox.</p>
    <AdminChats />
  </div></main>;
}
