"use client"
import { ArrowUp } from 'lucide-react'
import React, { useCallback, useLayoutEffect, useRef } from 'react'
import { Button } from './ui/button'

const ScrollUpButton = () => {
    const ref = useRef<HTMLButtonElement | null>(null)

    const handleClick = useCallback(() => {
        window.scrollTo({ behavior: 'smooth', top: 0 })
    }, [])

    useLayoutEffect(() => {
        const handleScroll = () => {
            if (!ref.current) {
                return
            }
            const scrollYPos = Math.floor(window.scrollY)
            if (scrollYPos < 120) {
                ref.current.setAttribute('style', `scale: ${scrollYPos / 100}`)
            } else {
                ref.current.setAttribute('style', `scale: ${1.20}`)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <Button type='button' ref={ref} onClick={handleClick} size={'icon'} className='fixed bottom-5 right-5 z-[1000]' style={{ scale: 0 }} variant={'secondary'}>
            <ArrowUp />
        </Button>
    )
}

export default ScrollUpButton