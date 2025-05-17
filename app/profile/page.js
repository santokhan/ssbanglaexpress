'use client'

import useAuth from "@/hooks/useAuth"

const ProfilePage = () => {
    const { user } = useAuth()

    return (
        <div className="min-h-svh flex flex-col items-center justify-evenly bg-gray-50 px-4 py-10">
            <div className="max-w-md w-full p-8 bg-white shadow-xl rounded-2xl space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Your Profile</h2>
                    <p className="text-sm text-gray-600">Here&apos;s your account information</p>
                </div>

                <ProfileItem label="Full Name" value={user?.name} />
                <ProfileItem label="Username" value={user?.username} />
                <ProfileItem label="Email" value={user?.email} />
                {/* Add more fields if needed */}

                <div className="text-center text-gray-500">
                    <a href="/signout" className="default">
                        Sign out
                    </a>
                </div>
            </div>
            <div></div>
        </div>
    )
}

const ProfileItem = ({ label, value }) => (
    <div className="flex justify-between items-start py-3">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium text-gray-900">{value || "-"}</span>
    </div>
)

export default ProfilePage
