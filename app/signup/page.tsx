"use client";

import { useState, type FormEvent } from "react";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (!apiUrl) {
      setMessage("Account registration is not configured yet. Please contact our team for help.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");
    try {
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
      });
      setMessage(response.ok
        ? "Your account request was received. You can sign in once your account is active."
        : "We could not create your account. Check your details or contact our team.");
    } catch {
      setMessage("Unable to reach the account service. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Create your account</h1>
          <p className="mt-2 text-sm text-gray-600">Already have an account? <a href="/signin" className="text-red-600 hover:underline">Sign in</a></p>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">Full name<input name="name" autoComplete="name" required maxLength={100} className="default" /></label>
          <label className="block text-sm font-medium text-gray-700">Username<input name="username" autoComplete="username" required minLength={3} maxLength={50} className="default" /></label>
          <label className="block text-sm font-medium text-gray-700">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} className="default" /></label>
          <label className="block text-sm font-medium text-gray-700">Password<input name="password" type="password" autoComplete="new-password" required minLength={12} className="default" /></label>
          <button className="default w-full" disabled={isSubmitting}>{isSubmitting ? "Creating account…" : "Sign Up"}</button>
          {message && <p role="status" className="text-center text-sm text-slate-700">{message}</p>}
        </form>
      </div>
    </main>
  );
}
