import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType, BlogReviewType } from "@/lib/types";

export default function useFetchInfiniteBlogReviews(blogId: string) {
    
    const queryClient = useQueryClient()

    const { actions } = use(ActionsContext) as ActionsProviderType;

    const handleFetch = useCallback((blogId: string) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: BlogReviewType[], currentPage: number, nextPage: number | null }> => {
            const { page, reviews, totalPages } = await actions.getBlogReviews({ blogId, page: pageParam, totalReviews: 5 })

            return { data: reviews!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null }
        }
    }, [actions])

    const { data: blogReviews, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: [`blog_reviews`, blogId],
        queryFn: handleFetch(blogId),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        refetchOnWindowFocus: false
    }, queryClient)


    return {
        blogReviews,
        isLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    }
}