import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useSearchQuery from "../useSearchQuery";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import { fetchAnimes } from "../functions/anime";
import { useSearchParams } from "next/navigation";


export default function useFetchInfinitAnimes() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const { searchQuery: currentSearhQuery } = useSearchQuery()
    const searchParams = useSearchParams()

    const { data: animes, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_animes', { query: currentSearhQuery || searchParams.get('query') }],
        queryFn: fetchAnimes(currentSearhQuery, searchParams.get('query') || ''),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        staleTime: 100,
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