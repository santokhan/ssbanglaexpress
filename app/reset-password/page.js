const ResetPasswordPage = () => {
    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your new password below.
                    </p>
                </div>

                <form className="mt-8 space-y-6">
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
                        <button type="submit" className="default w-full">Reset Password</button>
                    </div>
                </form>

                <div className="text-center">
                    <a href="/signin" className="text-blue-600 hover:underline text-sm">
                        Back to Sign In
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage;