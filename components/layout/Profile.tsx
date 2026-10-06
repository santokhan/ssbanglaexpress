'use client'

import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserCircle } from "@fortawesome/free-regular-svg-icons"
import useAuth from "@/hooks/useAuth"

const Profile = () => {
    const { user } = useAuth();

    const href = user ? '/profile' : '/signin'

    return (
        <Link href={href} className="size-8" title={user?.name || user?.username}>
            <FontAwesomeIcon icon={faUserCircle} className="w-full h-full" />
        </Link>
    )
}

export default Profile