import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";
import {  useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Anime } from "@prisma/client";
import { getAnimes } from "@/lib/actions/anime";


export default function useFetchInfinitAnimes() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const searchParams = useSearchParams()

    const handleFetch = useCallback((searchQuery: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: Anime[], currentPage: number, nextPage: number | null }> => {
            const { animes, page, totalPages } = await getAnimes({ query: searchQuery, page: pageParam, totalAnimes: 12 })

            return {
                data: animes!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
            }
        }
    }, [])

    const { data: animes, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_animes', { query: searchParams.get('query') || 'all' }],
        queryFn: handleFetch(searchParams.get('query') || 'all'),
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
        animes,
        status,
        isFetchingNextPage,
        isLoading,
        intersectingRef,
        refetch
    }
}