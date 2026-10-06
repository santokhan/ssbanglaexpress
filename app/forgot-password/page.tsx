'use client'

import { useState, type FormEvent } from "react"

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL
      if (!apiUrl) throw new Error("Password recovery is not configured. Please contact our team.")
      const response = await fetch(`${apiUrl.replace(/\/$/, "")}/v1/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!response.ok) throw new Error("We could not process your request. Please try again later.")

      setStatus("success")
      setMessage("If an account matches that email, password reset instructions will be sent.")
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong.")
    }
  }

  return (
    <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
          <p className="mt-2 text-sm text-gray-600">
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
            className={`text-center mt-4 ${
              status === "error" ? "text-red-600" : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="text-center mt-6">
          <a href="/signin" className="text-red-600 hover:underline text-sm">
            Back to Sign In
          </a>
        </div>
      </div>
      <div></div>
    </div>
  )
}

export default ForgotPasswordPage
