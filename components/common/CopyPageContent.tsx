"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CopyPageContent({ contentId }: { contentId: string }) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  async function copyContent() {
    const source = document.getElementById(contentId);
    if (!source) return;
    const content = source.cloneNode(true) as HTMLElement;
    content.querySelectorAll("[data-copy-page-button]").forEach((element) => element.remove());
    const text = (content.innerText || content.textContent || "").trim();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setError(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setError(true);
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      data-copy-page-button
      onClick={copyContent}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#b81e46] hover:text-[#b81e46] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
      aria-live="polite"
    >
      {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
      {copied ? "Copied to clipboard" : error ? "Could not copy. Try again" : "Copy page text"}
    </button>
  );
}
