import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useSearchQuery from "../useSearchQuery";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import { fetchAnimes } from "../functions/anime";


export default function useFetchInfinitAnimes(searchQuery: string) {
    const queryClient = useQueryClient()
    const { searchQuery: currentSearchQuery } = useSearchQuery()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });

    const { data: animes, status, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['animes'],
        queryFn: fetchAnimes(currentSearchQuery, searchQuery),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
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
        intersectingRef
    }
}