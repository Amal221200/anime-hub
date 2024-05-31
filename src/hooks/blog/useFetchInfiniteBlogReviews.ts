import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getBlogReviews } from "../functions/blog-review";

export default function useFetchInfiniteBlogReviews(blogId: string) {
    
    const queryClient = useQueryClient()
    const { data: blogReviews, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
        queryKey: [`blog_reviews`, blogId],
        queryFn: getBlogReviews(blogId),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        refetchOnWindowFocus: false
    }, queryClient)


    return {
        blogReviews,
        isLoading,
        fetchNextPage,
        hasNextPage
    }
}