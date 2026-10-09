"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signupAction } from "@/actions/auth/signup";
import GoogleAuth from "@/components/auth/GoogleAuth";

export default function SignupPage() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");
    try {
      const formData = new FormData(event.currentTarget);
      const result = await signupAction({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      });
      if (!result.ok) throw new Error(result.message);
      router.replace("/profile");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card space-y-7">
        <div className="text-center">
          <span className="mb-3 inline-flex rounded-full bg-[#b81e46]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#a51a40]">Start shipping smarter</span>
          <h1 className="auth-heading">Create your account</h1>
          <p className="auth-copy">Already have an account? <a href="/auth/signin" className="auth-link">Sign in</a></p>
        </div>
        <GoogleAuth mode="signup" />
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-gray-700">Full name<input name="name" autoComplete="name" required maxLength={100} className="default" /></label>
          <label className="block text-sm font-medium text-gray-700">Email address<input name="email" type="email" autoComplete="email" required maxLength={254} className="default" /></label>
          <label className="block text-sm font-medium text-gray-700">Password<input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={72} className="default" /></label>
          <button className="default w-full" disabled={isSubmitting}>{isSubmitting ? "Creating accountâ€¦" : "Sign Up"}</button>
          {message && <p role="status" className="rounded-xl bg-rose-50 p-3 text-center text-sm text-rose-700">{message}</p>}
        </form>
      </div>
    </main>
  );
}
