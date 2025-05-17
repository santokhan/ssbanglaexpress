const NotFoundPage = () => {
    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4">
            <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl text-center space-y-6">
                <div>
                    <h1 className="text-6xl font-bold text-red-500">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-800 mt-2">Page Not Found</h2>
                    <p className="text-sm text-gray-600 mt-2">
                        Sorry, the page you are looking for does not exist or has been moved.
                    </p>
                </div>

                <div>
                    <a href="/" className="inline-block bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition">
                        Go to Homepage
                    </a>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default NotFoundPage;