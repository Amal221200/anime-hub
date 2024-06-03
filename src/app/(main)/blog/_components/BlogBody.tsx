"use client"
import { useCallback } from 'react'
import SearchBox from '@/components/SearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next13-progressbar';
import dynamic from 'next/dynamic';
import SectionContainer from '@/components/containers/SectionContainer';
import SectionLoading from '@/components/loading/SectionLoading';


const BlogSection = dynamic(() => import('./BlogSection'), {
    ssr: false, loading: () =>
        <SectionContainer >
            <SectionLoading  />
        </SectionContainer>
})

const BlogBody = ({ query }: { query: string }) => {
    const queryClient = useQueryClient()
    const router = useRouter()

    const handleSearch = useCallback(async (query: string) => {
        router.push(`/blog?query=${query || 'all'}`)
        await queryClient.invalidateQueries({ queryKey: ['fetch_blogs', { query: query || 'all' }] })
    }, [router, queryClient])

    return (
        <>
            <SearchBox handleSearch={handleSearch} placeholder="Search blog" />
            <BlogSection heading={query === 'all' ? 'All Blogs' : `Results of ${query}`} searchQuery={query} className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default BlogBody