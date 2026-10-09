"use client";

import Script from "next/script";
import { useCallback, useRef, useState } from "react";
import { signInWithGoogle } from "@/app/actions/auth";

type GoogleCredentialResponse = { credential?: string };
type GoogleIdentity = {
  accounts: { id: {
    initialize: (options: { client_id: string; callback: (response: GoogleCredentialResponse) => void; auto_select?: boolean }) => void;
    renderButton: (element: HTMLElement, options: { theme: "outline"; size: "large"; text: "continue_with"; shape: "rectangular"; width: number }) => void;
  } };
};

declare global {
  interface Window { google?: GoogleIdentity }
}

export default function GoogleAuth({ mode }: { mode: "signin" | "signup" }) {
  const [buttonRendered, setButtonRendered] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const button = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleCredential = useCallback(async (response: GoogleCredentialResponse) => {
    if (!response.credential) {
      setError("Google sign-in did not return a credential. Please try again.");
      return;
    }
    setBusy(true);
    setError("");
    try {
      const result = await signInWithGoogle(response.credential);
      if (!result.ok) throw new Error(result.message);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Unable to reach the account service. Please try again.");
      setBusy(false);
    }
  }, []);

  const initialize = useCallback(() => {
    if (!clientId || !window.google || !button.current) return;
    button.current.replaceChildren();
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => { void handleCredential(response); },
      auto_select: false,
    });
    window.google.accounts.id.renderButton(button.current, {
      theme: "outline", size: "large", text: "continue_with", shape: "rectangular",
      width: Math.min(360, button.current.clientWidth || 320),
    });
    setButtonRendered(true);
  }, [clientId, handleCredential]);

  return (
    <div className="space-y-3">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initialize} />
      {clientId ? <>
        <div ref={button} className="flex min-h-10 justify-center" aria-label="Continue with Google" />
        {!buttonRendered && <p className="text-center text-xs text-slate-500">Loading Google sign-in…</p>}
      </> : <p className="rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">Google sign-in is not configured.</p>}
      {busy && <p role="status" className="text-center text-sm text-slate-600">{mode === "signup" ? "Creating your account…" : "Signing in with Google…"}</p>}
      {error && <p role="alert" className="text-center text-sm text-rose-700">{error}</p>}
      <div className="flex items-center gap-3 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />or use email<span className="h-px flex-1 bg-slate-200" /></div>
    </div>
  );
}
