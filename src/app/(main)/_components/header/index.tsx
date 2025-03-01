"use client"
import { useEffect, useRef, ElementRef } from 'react'
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Header = () => {
    const headerRef = useRef<ElementRef<'header'>>(null);
    const scrollY = useRef(0)

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
        <header ref={headerRef} className="header-transition fixed left-0 right-0 top-0 z-100 bg-background/50 backdrop-blur-xs">
            <div className="mx-auto flex items-center justify-between px-2 sm:max-w-[90vw] sm:px-3">
                <LeftSide />
                <RightSide />
            </div>
        </header>
    );
}

export default Header;