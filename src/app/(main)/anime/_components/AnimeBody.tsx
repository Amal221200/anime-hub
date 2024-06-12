"use client"
import { useCallback } from 'react'
import AnimeSearchBox from '@/components/search-box/AnimeSearchBox';
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

const AnimeBody = ({ query, ...props }: { query: string, artists: { artist: string }[], studios: { studio: string }[], genres: string[] }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleSearch = useCallback(async ({ query, artist, genre, studio, status, fromYear, toYear }: { query: string, studio: string, status: string, genre: string, artist: string, fromYear: number, toYear: number }) => {
        
        router.push(`/anime?query=${query || ''}&artist=${artist || ''}&studio=${studio || ''}&genre=${genre || ''}&status=${status || ''}&fromYear=${fromYear || ''}&toYear=${toYear || ''}`)
        await queryClient.invalidateQueries({
            queryKey: ['fetch_animes', {
                query: query || '',
                artist: artist || '',
                genre: genre || '',
                status: status || '',
                fromYear,
                toYear,
            }]
        })
    }, [router, queryClient])

    return (
        <>
            <AnimeSearchBox handleSearch={handleSearch} placeholder="Search anime" {...props} />
            <AnimeSection
                heading={query ? `Results of ${query}` : 'All Animes'} searchQuery={query}
                className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default AnimeBody