import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType, AnimeReviewType } from "@/lib/types";
import { use, useCallback } from "react";

export default function useFetchInfiniteAnimeReviews(animeId: string) {
    const queryClient = useQueryClient()

    const { actions } = use(ActionsContext) as ActionsProviderType;

    const handleFetch = useCallback((animeId: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: AnimeReviewType[], currentPage: number, nextPage: number | null }> => {
            const { page, reviews, totalPages } = await actions.getAnimeReviews({ animeId, page: pageParam, totalReviews: 5 })

            return { data: reviews!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null }
        }
    }, [actions])

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