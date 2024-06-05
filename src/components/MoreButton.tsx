"use client"

import React, { useCallback } from 'react'
import { Button } from './ui/button'
import { CircleArrowRight } from 'lucide-react'
import { useRouter } from 'next13-progressbar';
import { useQueryClient } from '@tanstack/react-query'

const MoreButton = ({ to, queryKey }: { to: string, queryKey: string }) => {
    const router = useRouter()
    const queryClient = useQueryClient();

    const handleClick = useCallback(async () => {
        router.push(to)
        await queryClient.invalidateQueries({ queryKey: [queryKey, { query: '' }] })
    }, [ router, queryClient, to, queryKey])

    return (
        <Button onClick={handleClick} variant="ghost" type="button" size="icon" className="cursor-pointer rounded-full" asChild>
            <CircleArrowRight size={10} />
        </Button>
    )
}

export default MoreButton