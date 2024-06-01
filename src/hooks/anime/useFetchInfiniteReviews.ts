import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getReviews } from "../functions/anime-review";

export default function useFetchInfiniteReviews(animeId: string) {

    const queryClient = useQueryClient()
    const { data: reviews, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [`reviews`, animeId],
        queryFn: getReviews(animeId),
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