'use client'

import Link from "next/link"
import useAuth from "@/hooks/useAuth"

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

    const href = '/profile'
    const avatar = user?.avatarUrl
    const initials = (user?.name || user?.email || '?')
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()

    return (
        <Link href={href} className="flex size-8 items-center justify-center overflow-hidden rounded-full bg-gray-200 text-xs font-semibold text-gray-700" title={user.name || 'Profile'} aria-label={user.name ? `${user.name}'s profile` : 'Profile'}>
            {avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatar} alt="" className="size-full object-cover" />
            ) : (
                <span aria-hidden="true">{initials}</span>
            )}
        </Link>
    )
}

export default Profile
