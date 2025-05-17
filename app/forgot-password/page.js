const ForgotPasswordPage = () => {
    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Forgot your password?</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email and we&apos;ll send you a link to reset your password.
                    </p>
                </div>

                <form className="mt-8 space-y-6">
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
                            />
                        </div>
                    </div>

                    <div>
                        <button className="default w-full">Send Reset Link</button>
                    </div>
                </form>

                <div className="text-center">
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