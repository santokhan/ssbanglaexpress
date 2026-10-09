'use client'

import Script from "next/script";
import { useCallback, useRef, useState, type FormEvent } from "react";
import { signInWithGoogle } from "@/app/actions/auth";
import { signinAction } from "@/actions/auth/signin";

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

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [googleButtonRendered, setGoogleButtonRendered] = useState(false);
    const [googleError, setGoogleError] = useState("");
    const [googleBusy, setGoogleBusy] = useState(false);
    const googleButton = useRef<HTMLDivElement>(null);
    const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    const handleGoogleCredential = useCallback(async (response: GoogleCredentialResponse) => {
        if (!response.credential) {
            setGoogleError("Google sign-in did not return a credential. Please try again.");
            return;
        }

        setGoogleBusy(true);
        setGoogleError("");
        try {
            const result = await signInWithGoogle(response.credential);
            if (!result.ok) throw new Error(result.message);
        } catch (error) {
            setGoogleError(error instanceof Error ? error.message : "Unable to reach the account service. Please try again.");
            setGoogleBusy(false);
        }
    }, []);

    const initializeGoogleButton = useCallback(() => {
        if (!googleClientId || !window.google || !googleButton.current) return;
        googleButton.current.replaceChildren();
        window.google.accounts.id.initialize({
            client_id: googleClientId,
            callback: (response) => { void handleGoogleCredential(response); },
            auto_select: false,
        });
        window.google.accounts.id.renderButton(googleButton.current, {
            theme: "outline", size: "large", text: "continue_with", shape: "rectangular",
            width: Math.min(360, googleButton.current.clientWidth || 320),
        });
        setGoogleButtonRendered(true);
    }, [googleClientId, handleGoogleCredential]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setGoogleBusy(true);
        setGoogleError("");
        try {
            const result = await signinAction({ email, password });
            if (!result.ok) throw new Error(result.message);
        } catch (error) {
            setGoogleError(error instanceof Error ? error.message : "Unable to sign in. Please try again.");
            setGoogleBusy(false);
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card space-y-7">
                <div className="text-center">
                    <span className="mb-3 inline-flex rounded-full bg-[#b81e46]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#a51a40]">Welcome back</span>
                    <h1 className="auth-heading">Sign in to your account</h1>
                    <p className="auth-copy">
                        New to SS Bangla Express? <a href="/auth/signup" className="auth-link">Create an account</a>
                    </p>
                </div>
                <div className="space-y-3">
                    <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" onLoad={initializeGoogleButton} />
                    {googleClientId ? <>
                        <div ref={googleButton} className="flex min-h-10 justify-center" aria-label="Continue with Google" />
                        {!googleButtonRendered && <p className="text-center text-xs text-slate-500">Loading Google sign-inâ€¦</p>}
                    </> : <p className="rounded-lg bg-amber-50 px-3 py-2 text-center text-sm text-amber-900">Google sign-in is not configured.</p>}
                    {googleBusy && <p role="status" className="text-center text-sm text-slate-600">Signing in with Googleâ€¦</p>}
                    {googleError && <p role="alert" className="text-center text-sm text-rose-700">{googleError}</p>}
                    <div className="flex items-center gap-3 text-xs font-medium text-slate-400"><span className="h-px flex-1 bg-slate-200" />or continue with email<span className="h-px flex-1 bg-slate-200" /></div>
                </div>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="default"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="default"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="/auth/forgot-password" className="auth-link text-sm">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div className="pt-1">
                        <button type="submit" className="default w-full" disabled={googleBusy}>{googleBusy ? "Signing in..." : "Sign in"}</button>
                    </div>
                </form>
            </div>
            <div></div>
        </main>
    )
}

export default Page
