"use client"
import { UserButton, useSession } from '@clerk/nextjs';
import { LogIn, LogOut, Search, User } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, ElementRef, useCallback, useState, FormEvent } from 'react'

const Header = () => {
  const [mounted, setMounted] = useState(false)
  const headerRef = useRef<ElementRef<'header'>>(null);
  const router = useRouter()
  const scrollY = useRef(0)
  const { isSignedIn }  = useSession()

  const handleSearch = useCallback((e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const search = formData.get('search')?.toString()!
    router.push(`/search?query=${search}`)
  }, [router])

  

  useEffect(() => {
    setMounted(true)

    if (headerRef.current === null) {
      return
    }

    window.addEventListener('scroll', () => {
      if (scrollY.current < window.scrollY) {
        headerRef.current?.classList.replace('top-0', 'top-[-100%]')
      } else if (scrollY.current > window.scrollY) {
        headerRef.current?.classList.replace('top-[-100%]', 'top-0')
      }
      scrollY.current = window.scrollY
    })
  }, [])

  // if (!mounted) {
  //   return null
  // }

  return (
    <header ref={headerRef} className="header-transition fixed left-0 right-0 top-0 z-[100] bg-white/90 text-black">
      <div className="mx-auto flex max-w-[90vw] items-center justify-between px-3">
        <div className="">
          <Link href={"/"} className='relative block h-[100px] w-[130px] sm:w-[150px]'>
            <Image src="/logo-header.png" alt="logo" fill className="w-full object-contain" />
          </Link>
        </div>
        <form onSubmit={handleSearch} className="hidden w-[50vw] items-center overflow-hidden rounded-full bg-zinc-100 sm:flex">
          <input type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder="Search anime" />
          <button type="submit">
            <Search size={20} className="mr-3" />
          </button>
        </form>
        <div className="flex items-center gap-5">
          {/* {userStatus === 'authenticated' && <User />} */}
          <div className="flex">
            {(isSignedIn) ? (
              <UserButton />
            ) :
              <Link href="/auth/sign-in" className="flex gap-3">Login <LogIn /></Link>
            }
          </div>
        </div>
      </div>
      {/* Mobille Search */}
      <form onSubmit={handleSearch} className="mx-auto mb-2 flex w-[80vw] items-center overflow-hidden rounded-full bg-zinc-100 sm:hidden">
        <input type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder="Search anime" />
        <button type="submit">
          <Search size={20} className="mr-3" />
        </button>
      </form>
    </header>
  );
}

export default Header;