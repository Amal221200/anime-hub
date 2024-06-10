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
    const query = searchParams.get('query') ?? ''
    const fromYear = searchParams.get('fromYear') ?? ''
    const toYear = searchParams.get('toYear') ?? ''
    const pathname = usePathname()

    const handleFetch = useCallback(({ query, fromYear, toYear }: { query: string, fromYear: number, toYear: number }) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogType[], currentPage: number, nextPage: number | null }> => {
            const { blogs, page, totalPages } = await getBlogs({ query, fromYear, toYear, page: pageParam, totalBlogs: 12 })

            return {
                data: blogs!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
            }
        }
    }, [])

    const { data: blogs, status, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_blogs', {
            query,
            fromYear: parseInt(fromYear!),
            toYear: parseInt(toYear!),
        }],
        queryFn: handleFetch({
            query,
            fromYear: parseInt(fromYear!),
            toYear: parseInt(toYear!),
        }),
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