"use client"

import React, { useCallback } from 'react'
import { Button } from './ui/button'
import { CircleArrowRight } from 'lucide-react'
import { useRouter } from 'next13-progressbar';
import useSearchQuery from '@/hooks/useSearchQuery'
import { useQueryClient } from '@tanstack/react-query'

const MoreButton = ({ to, queryKey }: { to: string, queryKey: string }) => {
    const { setSearchQuery } = useSearchQuery()
    const router = useRouter()
    const queryClient = useQueryClient();

    const handleClick = useCallback(async () => {
        setSearchQuery('all')
        router.push(`${to}?query=all`)
        setTimeout(async () => {
            await queryClient.invalidateQueries({ queryKey: [queryKey, { query: 'all' }] })
        })
    }, [setSearchQuery, router, queryClient, to, queryKey])

    return (
        <Button onClick={handleClick} variant="ghost" type="button" size="icon" className="cursor-pointer rounded-full" asChild>
            <CircleArrowRight size={10} />
        </Button>
    )
}

export default MoreButton