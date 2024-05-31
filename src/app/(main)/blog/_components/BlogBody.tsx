"use client"

import { useCallback } from 'react'
import SearchBox from '../../../../components/SearchBox';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next13-progressbar';
import useSearchQuery from '@/hooks/useSearchQuery';
import dynamic from 'next/dynamic';
import SkeletonSpinner from '@/components/SkeletonSpinner';


const BlogSection = dynamic(() => import('./BlogSection'), {
    ssr: false, loading: () =>
        <SkeletonSpinner className="h-[85vh]" />
})

const BlogBody = ({ query }: { query: string }) => {
    const queryClient = useQueryClient()
    const router = useRouter()
    const { setSearchQuery } = useSearchQuery()

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query || 'all');
        router.push(`/blog?query=${query || 'all'}`)
        setTimeout(() => {
            queryClient.invalidateQueries({ queryKey: ['fetch_blogs', { query: query || 'all' }] })
        })
    }, [router, queryClient, setSearchQuery])

    return (
        <>
            <SearchBox handleSearch={handleSearch} placeholder="Search blog" />
            <BlogSection heading={query === 'all' ? 'All Blogs' : `Results of ${query}`} searchQuery={query} className='min-h-[calc(100dvh-160px)' />
        </>
    )
}

export default BlogBody