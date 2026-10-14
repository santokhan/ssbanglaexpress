"use client";

import { useRef, useState, useTransition, type FormEvent } from "react";
import { importPublicRates } from "@/app/admin/actions";

export default function RateCsvUpload() {
  const form = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMessage("");
    startTransition(async () => {
      const result = await importPublicRates(data);
      setMessage(result.message);
      setSuccess(result.ok);
      if (result.ok) form.current?.reset();
    });
  }

  return (
    <form ref={form} onSubmit={submit} className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
      <label className="block text-sm font-semibold text-slate-800" htmlFor="rate-csv">CSV rate sheet</label>
      <input id="rate-csv" name="file" type="file" accept=".csv,text/csv" required className="mt-2 block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700 file:mr-4 file:rounded-lg file:border-0 file:bg-white file:px-3 file:py-2 file:text-sm file:font-semibold file:text-slate-800" />
      <p className="mt-3 text-sm leading-6 text-slate-500">Uploading replaces the currently published rate sheet. Invalid files leave current rates unchanged.</p>
      <button type="submit" disabled={pending} className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#b81e46] px-6 py-2.5 text-sm font-bold text-white transition hover:bg-[#94183a] disabled:cursor-wait disabled:opacity-60">{pending ? "Importing…" : "Validate and publish"}</button>
      {message && <p role={success ? "status" : "alert"} className={`mt-4 rounded-xl px-4 py-3 text-sm font-medium ${success ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}>{message}</p>}
    </form>
  );
}
