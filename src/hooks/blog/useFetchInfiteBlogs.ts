import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";
import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { BlogType } from "@/lib/types";
import { getBlogs } from "@/lib/actions/blog";


export default function useFetchInfinitBlogs() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleFetch = useCallback((searchQuery: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogType[], currentPage: number, nextPage: number | null }> => {
            const { blogs, page, totalPages } = await getBlogs({ query: searchQuery, page: pageParam, totalBlogs: 12 })

            return {
                data: blogs!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
            }
        }
    }, [])

    const { data: blogs, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_blogs', { query: searchParams.get('query') || '' }],
        queryFn: handleFetch(searchParams.get('query') || ''),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        enabled: pathname.startsWith('/blog')
    }, queryClient)

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage()
        }
    }, [isIntersecting, fetchNextPage])

    return {
        blogs,
        status,
        isFetchingNextPage,
        isLoading,
        intersectingRef,
        refetch
    }
}