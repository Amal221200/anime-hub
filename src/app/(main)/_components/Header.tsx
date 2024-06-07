"use client"
import { UserButton, useSession } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, ElementRef, useCallback, FormEvent } from 'react'

const Header = () => {
  const headerRef = useRef<ElementRef<'header'>>(null);
  const scrollY = useRef(0)
  const { isSignedIn } = useSession()

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
    <header ref={headerRef} className="header-transition fixed left-0 right-0 top-0 z-[100] bg-background/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[90vw] items-center justify-between px-3">
        <div className="overflow-hidden rounded-md">
          <Link href="/" className='relative block h-[100px] w-[130px] overflow-hidden rounded-md sm:w-[150px]'>
            <Image src="/logo-header-dark.png" alt="logo" fill className="w-full object-contain" />
          </Link>
        </div>
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
    </header>
  );
}

export default Header;