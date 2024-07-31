"use client"
import { UserButton, useSession } from '@clerk/nextjs'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

const RightSide = () => {
    const { isSignedIn } = useSession()

    return (
        <div className="flex items-center gap-5">
            <div className="flex">
                {(isSignedIn) ? (
                    <UserButton />
                ) :
                    <Link href="/sign-in" className="flex items-center gap-x-1 text-sm sm:gap-x-3 sm:text-base">
                        Login <LogIn size={18} />
                    </Link>
                }
            </div>
        </div>
    )
}

export default RightSide