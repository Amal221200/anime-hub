import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useSearchQuery from "../useSearchQuery";
import { useIntersectionObserver } from "usehooks-ts";
import { use, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType, BlogType } from "@/lib/types";


export default function useFetchInfinitBlogs() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const { searchQuery: currentSearchQuery } = useSearchQuery()
    const searchParams = useSearchParams()

    const { actions } = use(ActionsContext) as ActionsProviderType;

    const handleFetch = useCallback((currentSearchQuery: string, searchQuery: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogType[], currentPage: number, nextPage: number | null }> => {
            const { blogs, page, totalPages } = await actions.getBlogs({ query: currentSearchQuery || searchQuery, page: pageParam, totalBlogs: 12 })

            return {
                data: blogs!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
            }
        }
    }, [actions])
    
    const { data: blogs, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_blogs', { query: currentSearchQuery || searchParams.get('query') }],
        queryFn: handleFetch(currentSearchQuery, searchParams.get('query') || ''),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        enabled: !!searchParams.get('query')
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