'use client'

import Link from "next/link"
import useAuth from "@/hooks/useAuth"
import AvatarImage from "@/components/common/AvatarImage"

const Profile = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) return null;

    if (!user) {
        return (
            <Link
                href="/auth/signin"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#b81e46] px-5 py-2 text-sm font-bold text-[#b81e46] transition hover:bg-[#b81e46] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
            >
                Sign in
            </Link>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {user.isAdmin && (
                <Link
                    href="/admin"
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#b81e46] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#94183a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b81e46]"
                >
                    Admin Panel
                </Link>
            )}
            <Link href="/profile" className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-700" title={user.name || 'Profile'} aria-label={user.name ? `${user.name}'s profile` : 'Profile'}>
                <AvatarImage src={user?.avatarUrl} className="size-full object-cover" />
            </Link>
        </div>
    )
}

export default Profile
