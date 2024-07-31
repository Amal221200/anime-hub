'use client'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

const navLinks = [
    {
        href: '/anime',
        label: 'Anime'
    },
    {
        href: '/blog',
        label: 'Blog'
    },
]

const LeftSide = () => {


    const pathname = usePathname()
    const isCurrentPath = useCallback((path: string) => pathname.startsWith(`${path}?query=`) || pathname === path, [pathname])

    return (
        <div className='flex items-center gap-x-2 sm:gap-x-10'>
            <div className="overflow-hidden rounded-md">
                <Link href="/" className='relative block h-[80px] w-[130px] overflow-hidden rounded-md sm:h-[100px] sm:w-[150px]'>
                    <Image src="/logo-header-dark.png" alt="logo" fill className="w-full object-contain" />
                </Link>
            </div>
            <nav className='space-x-2'>
                {
                    navLinks.map(navLink => (
                        <Link href={navLink.href} key={navLink.href} className={cn('sm:text-base text-sm', isCurrentPath(navLink.href) && 'underline sm:underline-offset-4 underline-offset-2')}>
                            {navLink.label}
                        </Link>
                    ))
                }
            </nav>
        </div>
    )
}

export default LeftSide