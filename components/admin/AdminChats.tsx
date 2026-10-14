"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { LoaderCircle, MessageCircle, Send } from "lucide-react";
import { listAdminChatsAction, markAdminChatReadAction, sendAdminChatMessageAction } from "@/actions/chat";
import type { ChatMessageView, ChatView } from "@/types/chat";
import LinkedMessage from "@/components/chat/LinkedMessage";

export default function AdminChats() {
  const [chats, setChats] = useState<ChatView[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const refresh = useCallback(async () => {
    const result = await listAdminChatsAction();
    if (result.ok) { setChats(result.data); setError(""); setSelectedId((current) => current && result.data.some((chat) => chat.id === current) ? current : result.data[0]?.id ?? null); }
    else setError(result.error);
    setLoading(false);
  }, []);
  useEffect(() => { void refresh(); const timer = window.setInterval(() => void refresh(), 5000); return () => window.clearInterval(timer); }, [refresh]);
  useEffect(() => { if (selectedId) void markAdminChatReadAction(selectedId); }, [selectedId]);
  const selected = chats.find((chat) => chat.id === selectedId) ?? null;
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [selected?.messages.length]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!selectedId || !draft.trim() || sending) return;
    setSending(true); setError("");
    const result = await sendAdminChatMessageAction(selectedId, draft);
    if (result.ok) { setDraft(""); setChats((current) => current.map((chat) => chat.id === selectedId ? { ...chat, closedAt: null, updatedAt: result.data.createdAt, lastMessage: result.data, messages: [...chat.messages, result.data] } : chat)); }
    else setError(result.error);
    setSending(false);
  }
  return <div className="mt-7 grid min-h-[620px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[340px_minmax(0,1fr)]">
    <aside className={`border-b border-slate-200 lg:border-b-0 lg:border-r ${selectedId ? "hidden lg:block" : ""}`} aria-label="Conversations">
      <div className="border-b border-slate-100 px-5 py-4"><h2 className="font-bold text-slate-900">Inbox <span className="ml-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs text-[#a61940]">{chats.length}</span></h2><p className="mt-1 text-xs text-slate-500">Updates automatically every few seconds</p></div>
      <div className="max-h-[70vh] overflow-y-auto">{loading && chats.length === 0 && <div className="flex justify-center py-12 text-[#a61940]"><LoaderCircle className="animate-spin" /></div>}{!loading && chats.length === 0 && <p className="px-5 py-12 text-center text-sm text-slate-500">No customer chats yet.</p>}{chats.map((chat) => <button key={chat.id} onClick={() => setSelectedId(chat.id)} className={`w-full border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 ${selectedId === chat.id ? "bg-rose-50/60" : ""}`}><span className="flex items-start justify-between gap-3"><span className="min-w-0"><span className="block truncate text-sm font-bold text-slate-900">{chat.user.name}</span><span className="mt-0.5 block truncate text-xs text-slate-500">{chat.user.email}</span></span>{chat.unreadCount > 0 && <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#b81e46] text-[10px] font-bold text-white">{chat.unreadCount}</span>}</span><span className="mt-2 block truncate text-xs text-slate-500">{chat.lastMessage?.content ?? "No messages yet"}</span><span className="mt-1 block text-[10px] text-slate-400">{chat.updatedAt ? new Date(chat.updatedAt).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" }) : ""}</span></button>)}</div>
    </aside>
    <section className={`flex min-h-[620px] flex-col ${!selectedId ? "hidden lg:flex" : ""}`}>
      {selected ? <>
        <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 sm:px-6"><button onClick={() => setSelectedId(null)} className="rounded-lg px-2 py-1 text-sm text-slate-500 hover:bg-slate-100 lg:hidden">Back</button><div className="flex size-10 items-center justify-center rounded-full bg-rose-50 text-[#a61940]"><MessageCircle size={19} /></div><div><h2 className="font-bold text-slate-900">{selected.user.name}{selected.isGuest && <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wide text-slate-500">Guest</span>}</h2><p className="text-xs text-slate-500">{selected.user.email}{selected.user.phone ? ` · ${selected.user.phone}` : ""}</p></div><span className="ml-auto hidden text-xs text-slate-400 sm:block">Conversation started {new Date(selected.updatedAt).toLocaleDateString("en-BD", { dateStyle: "medium", timeZone: "Asia/Dhaka" })}</span></header>
        {selected.contextType && <div className="border-b border-slate-100 bg-amber-50/70 px-5 py-2 text-xs text-slate-600">Topic: <span className="font-semibold capitalize">{selected.contextType}</span>{selected.contextReference && <> · Reference: <span className="font-semibold">{selected.contextReference}</span></>}</div>}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#fbfcfd] px-4 py-6 sm:px-6">{selected.messages.map((message) => <MessageBubble key={message.id} message={message} mine={!message.isOwn} />)}<div ref={bottomRef} />{error && <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}</div>
        <form onSubmit={submit} className="border-t border-slate-200 bg-white p-4 sm:px-6"><div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#b81e46] focus-within:ring-4 focus-within:ring-[#b81e46]/10"><label className="sr-only" htmlFor="admin-chat-message">Reply to customer</label><textarea id="admin-chat-message" value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} maxLength={4000} rows={1} placeholder="Write a reply…" className="max-h-32 min-h-11 flex-1 resize-y border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400" /><button disabled={sending || !draft.trim()} aria-label="Send reply" className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#b81e46] text-white hover:bg-[#94183a] disabled:opacity-50">{sending ? <LoaderCircle size={18} className="animate-spin" /> : <Send size={18} />}</button></div><p className="mt-2 text-[11px] text-slate-400">Press Enter to send, Shift + Enter for a new line.</p></form>
      </> : <div className="flex flex-1 flex-col items-center justify-center p-8 text-center"><MessageCircle size={38} className="text-slate-300" /><p className="mt-4 font-semibold text-slate-800">Select a conversation</p><p className="mt-1 text-sm text-slate-500">Customer messages will appear here.</p>{error && <p role="alert" className="mt-4 text-sm text-rose-700">{error}</p>}</div>}
    </section>
  </div>;
}

function MessageBubble({ message, mine }: { message: ChatMessageView; mine: boolean }) {
  return <div className={`flex ${mine ? "justify-end" : "justify-start"}`}><div className={`max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[72%] ${mine ? "rounded-br-md bg-[#b81e46] text-white" : "rounded-bl-md border border-slate-100 bg-white text-slate-800"}`}><p className={`mb-1 text-[11px] font-bold ${mine ? "text-white/70" : "text-[#a61940]"}`}>{mine ? "Support" : message.senderName}</p><LinkedMessage content={message.content} mine={mine} /><p className={`mt-2 text-right text-[10px] ${mine ? "text-white/60" : "text-slate-400"}`}>{new Date(message.createdAt).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Dhaka" })}</p></div></div>;
}
