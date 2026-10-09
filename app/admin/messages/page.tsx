import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { receivedAt: "desc" } });
  return <main className="min-h-svh px-4 py-9 sm:px-8"><div className="mx-auto max-w-7xl">
    <p className="text-xs font-bold uppercase tracking-[.2em] text-[#b81e46]">Operations</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Contact messages</h1><p className="mt-2 text-sm text-slate-600">Read messages sent through the website contact form.</p>
    <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">{messages.length ? <div className="divide-y divide-slate-100">{messages.map((message) => <article key={message.id} className="p-4 sm:px-5"><div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start"><div><p className="font-semibold text-slate-900">{message.firstName} {message.lastName}</p><a href={`mailto:${message.email}`} className="mt-1 inline-block text-sm text-[#a61940] hover:underline">{message.email}</a>{message.phone && <p className="mt-1 text-sm text-slate-500">{message.phone}</p>}</div><p className="text-sm text-slate-500">{message.receivedAt.toLocaleDateString("en-BD", { dateStyle: "medium", timeZone: "Asia/Dhaka" })}</p></div><p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-slate-700">{message.message}</p></article>)}</div> : <div className="p-12 text-center"><p className="font-semibold text-slate-800">No contact messages yet</p></div>}</div>
  </div></main>;
}
