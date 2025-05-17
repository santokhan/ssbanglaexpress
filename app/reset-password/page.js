'use client'

import { useState } from "react"

const ResetPasswordPage = () => {
    const [status, setStatus] = useState(null) // 'loading', 'success', 'error'
    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const form = e.target
        const password = form.password.value
        const confirmPassword = form.confirmPassword.value

        if (password !== confirmPassword) {
            setStatus("error")
            setMessage("Passwords do not match.")
            return
        }

        setStatus("loading")
        setMessage("")

        try {
            // Simulate API call delay
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const API = process.env.NEXT_PUBLIC_API_URL
            // Here you would call your real API to reset the password
            // Example:
            // const res = await fetch('/api/reset-password', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ password }),
            // })
            // if (!res.ok) throw new Error('Reset failed')

            setStatus("success")
            setMessage("Your password has been reset successfully.")
            form.reset() // Clear form inputs
        } catch (error) {
            setStatus("error")
            setMessage(error.message || "Failed to reset password.")
        }
    }

    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-sm text-gray-600">Enter your new password below.</p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="default"
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className="default"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="default w-full" disabled={status === "loading"}>
                            {status === "loading" ? "Resetting..." : "Reset Password"}
                        </button>
                    </div>
                </form>

                {message && (
                    <p
                        className={`text-center mt-4 ${status === "error" ? "text-red-600" : "text-green-600"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <div className="text-center">
                    <a href="/signin" className="text-blue-600 hover:underline text-sm">
                        Back to Sign In
                    </a>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default ResetPasswordPage
