"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Headset,
  LoaderCircle,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  getMyChatAction,
  sendChatMessageAction,
} from "@/actions/chat";
import type { ChatMessageView, ChatView } from "@/types/chat";

export default function ChatInbox({
  user,
}: {
  user: { id: string; name: string } | null;
}) {
  const [chat, setChat] = useState<ChatView | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [contextType, setContextType] = useState("support");
  const [contextReference, setContextReference] = useState("");
  const endRef = useRef<HTMLDivElement>(null);
  const refresh = useCallback(async () => {
    const result = await getMyChatAction();
    if (result.ok) {
      setChat(result.data);
      setError("");
    } else setError(result.error);
    setLoading(false);
  }, []);
  useEffect(() => {
    void refresh();
    const timer = window.setInterval(() => void refresh(), 5000);
    return () => window.clearInterval(timer);
  }, [refresh]);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages.length]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft.trim() || sending) return;
    setSending(true);
    setError("");
    const result = await sendChatMessageAction(
      user
        ? draft
        : {
            content: draft,
            name: guestName,
            email: guestEmail,
            phone: guestPhone,
            contextType,
            contextReference,
          },
    );
    if (result.ok) {
      setDraft("");
      if (chat)
        setChat((current) =>
          current
            ? {
                ...current,
                closedAt: null,
                messages: [...current.messages, result.data],
                lastMessage: result.data,
              }
            : current,
        );
      else await refresh();
    } else setError(result.error);
    setSending(false);
  }
  return (
    <div className="h-main overflow-hidden mx-auto grid h-full overflow-hidden border border-white bg-white lg:grid-cols-[340px_minmax(0,1fr)]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-[#171923] p-8 text-white lg:flex">
        <div className="absolute -right-24 -top-20 size-80 rounded-full bg-[#b81e46]/30 blur-3xl" />
        <div className="relative">
          <Link href="/" className="text-sm font-extrabold tracking-wide">
            SS <span className="text-rose-300">BANGLA</span> EXPRESS
          </Link>
          <div className="mt-24 inline-flex size-14 items-center justify-center rounded-2xl bg-white/10 text-rose-200 ring-1 ring-white/15">
            <Sparkles size={25} />
          </div>
          <p className="mt-7 text-xs font-bold uppercase tracking-[.22em] text-rose-200">
            Here to help
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight">
            Every shipment starts with a conversation.
          </h2>
          <p className="mt-4 text-sm leading-6 text-white/60">
            Ask about quotes, tracking, or delivery. Our team will guide you
            through the next step.
          </p>
        </div>
        <div className="relative space-y-4 text-sm text-white/70">
          <p className="flex items-center gap-3">
            <Check className="size-4 text-emerald-300" /> Personal support from
            our team
          </p>
          <p className="flex items-center gap-3">
            <ShieldCheck className="size-4 text-emerald-300" /> Your
            conversation stays private
          </p>
          <Link
            href={user ? "/profile" : "/"}
            className="mt-10 inline-flex items-center gap-2 text-xs font-semibold text-white/50 transition hover:text-white"
          >
            <ArrowLeft size={15} />{" "}
            {user ? "Back to my account" : "Back to website"}
          </Link>
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-col bg-[#fbfcfd]">
        <section className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
          <header className="flex items-center gap-3 border-b border-slate-100 px-4 py-4 text-slate-900 sm:px-7 sm:py-5">
            <Link
              href={user ? "/profile" : "/"}
              aria-label="Go back"
              className="inline-flex size-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <ArrowLeft size={19} />
            </Link>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-rose-400">
              <Headset size={23} />
            </div>
            <div>
              <h1 className="mt-1 text-xl font-bold">Chat with our team</h1>
              <p className="mt-1 text-sm text-slate-500">
                Send us a message and we’ll reply here.
              </p>
            </div>
            <span className="ml-auto flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <span className="size-2 rounded-full bg-emerald-500" />
              Online support
            </span>
          </header>
          <div className="flex min-h-0 flex-1 flex-col bg-[#fbfcfd]">
            <div className="flex-1 space-y-4 overflow-y-auto px-4 py-6 sm:px-7 sm:py-8">
              <p className="mx-auto max-w-sm rounded-2xl bg-rose-50 px-4 py-3 text-center text-xs leading-5 text-slate-600">
                {user
                  ? `Hi ${user.name.split(" ")[0]}, tell us how we can help with your shipment or service.`
                  : "Tell us how we can help. You can chat without creating an account."}
              </p>
              {loading && !chat && (
                <div className="flex justify-center py-10 text-[#a61940]">
                  <LoaderCircle className="animate-spin" />
                </div>
              )}
              {chat?.messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  mine={Boolean(message.isOwn)}
                />
              ))}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700"
                >
                  {error}
                </p>
              )}
              <div ref={endRef} />
            </div>
            <form
              onSubmit={submit}
              className="border-t border-slate-200 bg-white p-4 sm:px-6"
            >
              {!user && !chat && (
                <div className="mb-3 grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="mb-1 block text-xs font-semibold text-slate-600"
                    >
                      Your name
                    </label>
                    <input
                      id="guest-name"
                      required
                      maxLength={100}
                      value={guestName}
                      onChange={(event) => setGuestName(event.target.value)}
                      autoComplete="name"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guest-email"
                      className="mb-1 block text-xs font-semibold text-slate-600"
                    >
                      Email for replies
                    </label>
                    <input
                      id="guest-email"
                      required
                      type="email"
                      maxLength={254}
                      value={guestEmail}
                      onChange={(event) => setGuestEmail(event.target.value)}
                      autoComplete="email"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guest-phone"
                      className="mb-1 block text-xs font-semibold text-slate-600"
                    >
                      Phone{" "}
                      <span className="font-normal text-slate-400">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="guest-phone"
                      maxLength={30}
                      value={guestPhone}
                      onChange={(event) => setGuestPhone(event.target.value)}
                      autoComplete="tel"
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="chat-topic"
                      className="mb-1 block text-xs font-semibold text-slate-600"
                    >
                      What is this about?
                    </label>
                    <select
                      id="chat-topic"
                      value={contextType}
                      onChange={(event) => setContextType(event.target.value)}
                      className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46]"
                    >
                      <option value="support">General support</option>
                      <option value="quote">A quote</option>
                      <option value="shipment">A shipment</option>
                      <option value="tracking">Tracking</option>
                    </select>
                  </div>
                  {contextType !== "support" && (
                    <div className="sm:col-span-2">
                      <label
                        htmlFor="chat-reference"
                        className="mb-1 block text-xs font-semibold text-slate-600"
                      >
                        Reference number{" "}
                        <span className="font-normal text-slate-400">
                          (optional)
                        </span>
                      </label>
                      <input
                        id="chat-reference"
                        maxLength={100}
                        value={contextReference}
                        onChange={(event) =>
                          setContextReference(event.target.value)
                        }
                        placeholder={
                          contextType === "tracking"
                            ? "Tracking number"
                            : contextType === "quote"
                              ? "Quote request number"
                              : "Shipment number"
                        }
                        className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-[#b81e46]"
                      />
                    </div>
                  )}
                </div>
              )}
              <label htmlFor="chat-message" className="sr-only">
                Your message
              </label>
              <div className="flex items-end gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-2 focus-within:border-[#b81e46] focus-within:ring-4 focus-within:ring-[#b81e46]/10">
                <textarea
                  id="chat-message"
                  required
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  maxLength={4000}
                  rows={1}
                  placeholder="Write your message…"
                  className="max-h-32 min-h-11 flex-1 resize-y border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
                <button
                  disabled={sending || !draft.trim()}
                  aria-label="Send message"
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#b81e46] text-white transition hover:bg-[#94183a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sending ? (
                    <LoaderCircle size={18} className="animate-spin" />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </div>
              <p className="mt-2 text-[11px] text-slate-400">
                Press Enter to send, Shift + Enter for a new line.
              </p>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  mine,
}: {
  message: ChatMessageView;
  mine: boolean;
}) {
  const date = new Date(message.createdAt).toLocaleString("en-BD", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Dhaka",
  });
  return (
    <div className={`flex ${mine ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[72%] ${mine ? "rounded-br-md bg-[#b81e46] text-white" : "rounded-bl-md border border-slate-100 bg-white text-slate-800"}`}
      >
        <p
          className={`mb-1 text-[11px] font-bold ${mine ? "text-white/70" : "text-[#a61940]"}`}
        >
          {mine ? "You" : message.senderName}
        </p>
        <p className="whitespace-pre-wrap break-words text-sm leading-6">
          {message.content}
        </p>
        <p
          className={`mt-2 text-right text-[10px] ${mine ? "text-white/60" : "text-slate-400"}`}
        >
          {date}
        </p>
      </div>
    </div>
  );
}
