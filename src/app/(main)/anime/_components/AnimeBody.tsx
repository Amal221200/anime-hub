"use client"
import { useCallback } from 'react'
import SearchBox from '@/components/SearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next13-progressbar';
import dynamic from 'next/dynamic';
import SectionLoading from '@/components/loading/SectionLoading';
import SectionContainer from '@/components/containers/SectionContainer';


const AnimeSection = dynamic(() => import('../_components/AnimeSection'), {
    ssr: true, loading: () =>
        <SectionContainer >
            <SectionLoading />
        </SectionContainer>
})

const AnimeBody = ({ query }: { query: string }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleSearch = useCallback(async (query: string) => {
        router.push(`/anime?query=${query || ''}`)
        await queryClient.invalidateQueries({ queryKey: ['fetch_animes', { query: query || '' }] })
    }, [router, queryClient])

    return (
        <>
            <SearchBox handleSearch={handleSearch} placeholder="Search anime" />
            <AnimeSection
                heading={query ? `Results of ${query}` : 'All Animes'} searchQuery={query}
                className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default AnimeBody