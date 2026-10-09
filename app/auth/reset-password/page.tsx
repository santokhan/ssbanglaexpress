'use client'

import { useState, type FormEvent } from "react"
import { resetPassword } from "@/actions/auth/password-recovery"

const ResetPasswordPage = () => {
    const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null)
    const [message, setMessage] = useState("")

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const form = e.currentTarget
        const password = new FormData(form).get("password")
        const confirmPassword = new FormData(form).get("confirmPassword")

        if (password !== confirmPassword) {
            setStatus("error")
            setMessage("Passwords do not match.")
            return
        }

        setStatus("loading")
        setMessage("")

        try {
            const token = new URLSearchParams(window.location.search).get("token")
            if (typeof password !== "string" || typeof token !== "string") throw new Error("This reset link is invalid.")
            const result = await resetPassword({ token, password })
            if (!result.ok) throw new Error(result.message)

            setStatus("success")
            setMessage("Your password has been reset successfully.")
            form.reset() // Clear form inputs
        } catch (error) {
            setStatus("error")
            setMessage(error instanceof Error ? error.message : "Failed to reset password.")
        }
    }

    return (
        <main className="auth-page">
            <div className="auth-card space-y-7">
                <div className="text-center">
                    <span className="mb-3 inline-flex rounded-full bg-[#b81e46]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[.18em] text-[#a51a40]">Secure your account</span>
                    <h1 className="auth-heading">Reset your password</h1>
                    <p className="auth-copy">Choose a new password to get back to your account.</p>
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
                                minLength={8}
                                maxLength={72}
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
                        className={`mt-4 rounded-xl p-3 text-center text-sm ${status === "error" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-emerald-700"
                            }`}
                    >
                        {message}
                    </p>
                )}

                <div className="text-center">
                    <a href="/auth/signin" className="auth-link text-sm">
                        Back to Sign In
                    </a>
                </div>
            </div>
            <div></div>
        </main>
    )
}

export default ResetPasswordPage
