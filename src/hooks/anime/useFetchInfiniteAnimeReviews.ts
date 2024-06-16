import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { AnimeReviewType } from "@/lib/types";
import { useCallback } from "react";
import { getAnimeReviews } from "@/lib/actions/anime-review";

export default function useFetchInfiniteAnimeReviews(animeId: string) {
    const queryClient = useQueryClient()


    const handleFetch = useCallback((animeId: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: AnimeReviewType[], currentPage: number, nextPage: number | null }> => {
            const { page, reviews, totalPages } = await getAnimeReviews({ animeId, page: pageParam, totalReviews: 5 })

            return { data: reviews!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null }
        }
    }, [])

    const { data: reviews, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [`reviews`, animeId],
        queryFn: handleFetch(animeId),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        refetchOnWindowFocus: false
    }, queryClient)


    return {
        reviews,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}