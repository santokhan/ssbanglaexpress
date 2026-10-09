'use client'

import { useState, type FormEvent } from "react"
import { requestPasswordReset } from "@/actions/auth/password-recovery"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const result = await requestPasswordReset(email)
      if (!result.ok) throw new Error(result.message)

      setStatus("success")
      setMessage("If an account matches that email, password reset instructions will be sent.")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong.")
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card space-y-7">
        <div className="text-center">
          <span className="mb-3 inline-flex rounded-full bg-[#b81e46]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#a51a40]">Account recovery</span>
          <h1 className="auth-heading">Forgot your password?</h1>
          <p className="auth-copy">
            Enter your email and we&aposll send you a link to reset your password.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
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
                disabled={status === "loading"}
              />
            </div>
          </div>

          <div>
            <button className="default w-full" disabled={status === "loading"}>
              {status === "loading" ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {message && (
          <p
            className={`mt-4 rounded-xl p-3 text-center text-sm ${
              status === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-6">
          <a href="/auth/signin" className="auth-link text-sm">
            Back to Sign In
          </a>
        </div>
      </div>
      <div></div>
    </main>
  )
}

export default ForgotPasswordPage
