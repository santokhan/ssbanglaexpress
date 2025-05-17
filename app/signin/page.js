'use client'

import { useState } from 'react'

const Page = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const API = process.env.NEXT_PUBLIC_API_URL

            const response = await fetch(API + '/v1/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong')
            }

            // ✅ handle success (redirect or show success message)
            console.log('Login success:', data)
        } catch (error) {
            // ⚠️ handle error (show error message to the user)
            console.error('Login failed:', error.message)
        }
    }

    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
            <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-xl rounded-2xl">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Or <a href="/signup" className="text-red-600 hover:underline">create an account</a>
                    </p>
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
                            <a href="/forgot-password" className="font-medium text-red-600 hover:underline">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="default w-full">Sign In</button>
                    </div>
                </form>
            </div>
            <div></div>
        </div>
    )
}

export default Page
