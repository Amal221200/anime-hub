"use client"

import { useCallback } from 'react'
import SearchBox from '../../../../components/SearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next13-progressbar';
import useSearchQuery from '@/hooks/useSearchQuery';
import dynamic from 'next/dynamic';
import SkeletonSpinner from '@/components/SkeletonSpinner';


const AnimeSection = dynamic(() => import('../_components/AnimeSection'), { ssr: false, loading: () => 
<SkeletonSpinner className="h-[85vh]" /> })

const AnimeBody = ({ query }: { query: string }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { setSearchQuery } = useSearchQuery()

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query || 'all');
        router.push(`/anime?query=${query || 'all'}`)
        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
        })
    }, [router, queryClient, setSearchQuery])

    return (
        <>
            <SearchBox handleSearch={handleSearch} placeholder="Search anime" />
            <AnimeSection heading={query === 'all' ? 'All Animes' : `Results of ${query}`} searchQuery={query} className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default AnimeBody