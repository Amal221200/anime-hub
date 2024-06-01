import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import useSearchQuery from "../useSearchQuery";
import { useIntersectionObserver } from "usehooks-ts";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { fetchBlogs } from "../functions/blog";


export default function useFetchInfinitBlogs() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const { searchQuery: currentSearhQuery } = useSearchQuery()
    const searchParams = useSearchParams()

    const { data: blogs, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_blogs', { query: currentSearhQuery || searchParams.get('query') }],
        queryFn: fetchBlogs(currentSearhQuery, searchParams.get('query') || ''),
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