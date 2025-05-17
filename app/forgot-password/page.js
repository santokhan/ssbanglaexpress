'use client'

import { useState } from "react"

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null) // 'loading', 'success', 'error'
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email) {
      setMessage("Please enter your email.")
      setStatus("error")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const API = process.env.NEXT_PUBLIC_API_URL
      // Example: call your API here
      // const response = await fetch("/api/auth/forgot-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // })

      // if (!response.ok) throw new Error("Failed to send reset link")

      // Simulate API delay for demo
      await new Promise((r) => setTimeout(r, 1500))

      setStatus("success")
      setMessage("Reset link sent! Please check your email.")
    } catch (error) {
      setStatus("error")
      setMessage(error.message || "Something went wrong.")
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