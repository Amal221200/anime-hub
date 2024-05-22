"use client"
import { UserButton, useSession } from '@clerk/nextjs';
import { useQueryClient, } from '@tanstack/react-query';
import { LogIn } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next13-progressbar';
import React, { useEffect, useRef, ElementRef, useCallback, useState, FormEvent } from 'react'
import SearchBox from './SearchBox';

const Header = () => {
  const queryClient = useQueryClient()
  const headerRef = useRef<ElementRef<'header'>>(null);
  const router = useRouter()
  const scrollY = useRef(0)
  const { isSignedIn } = useSession()

  const handleSearch = useCallback(async (e: FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const search = formData.get('search')?.toString()!
    router.push(`/anime?query=${search}`)
    await queryClient.invalidateQueries({ queryKey: ['animes'] })
  }, [queryClient, router])



  useEffect(() => {
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

  return (
    <header ref={headerRef} className="header-transition fixed left-0 right-0 top-0 z-[100] bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[90vw] items-center justify-between px-3">
        <div className="overflow-hidden rounded-md">
          <Link href="/" className='relative block h-[100px] w-[130px] overflow-hidden rounded-md sm:w-[150px]'>
            <Image src="/logo-header-dark.png" alt="logo" fill className="w-full object-contain" />
          </Link>
        </div>
        <SearchBox handleSearch={handleSearch} />
        <div className="flex items-center gap-5">
          <div className="flex">
            {(isSignedIn) ? (
              <UserButton />
            ) :
              <Link href="/sign-in" className="flex gap-3">Login <LogIn /></Link>
            }
          </div>
        </div>
      </div>
      {/* Mobille Search */}
      <SearchBox handleSearch={handleSearch} mobile />
    </header>
  );
}

export default Header;