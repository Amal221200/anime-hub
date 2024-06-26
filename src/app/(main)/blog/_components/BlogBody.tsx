"use client"
import { useCallback } from 'react'
import BlogSearchBox from '@/components/search-box/BlogSearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next13-progressbar';
import dynamic from 'next/dynamic';
import SectionContainer from '@/components/containers/SectionContainer';
import SectionLoading from '@/components/loading/SectionLoading';


const BlogSection = dynamic(() => import('./BlogSection'), {
    ssr: true, loading: () =>
        <SectionContainer >
            <SectionLoading />
        </SectionContainer>
})

const BlogBody = ({ showHeading }: { showHeading: boolean }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleSearch = useCallback(async ({ query, fromYear, toYear }: { query: string, fromYear: number, toYear: number }) => {
        router.push(`/blog?query=${query || ''}&fromYear=${fromYear || ''}&toYear=${toYear || ''}`)
        await queryClient.invalidateQueries({
            queryKey: ['fetch_blogs', {
                query: query || '',
                fromYear: fromYear || '',
                toYear: fromYear || '',
            }]
        })
    }, [router, queryClient])

    return (
        <>
            <BlogSearchBox handleSearch={handleSearch} placeholder="Search blog" />
            <BlogSection heading={showHeading ? `Search Results` : 'All Blogs'} className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default BlogBody