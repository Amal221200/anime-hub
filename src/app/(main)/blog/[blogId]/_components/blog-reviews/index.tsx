"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { Fragment, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import Review from "./Review";
import useFetchInfiniteBlogReviews from "@/hooks/blog/useFetchInfiniteBlogReviews";
import ReviewLoader from "@/components/review/ReviewLoader";
import ReviewsLoading from "@/components/loading/ReviewsLoading";

const BlogReviewsSection = ({ blogId }: { blogId: string }) => {

    const { blogReviews, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useFetchInfiniteBlogReviews(blogId)

    const handleLoadMore = useCallback(async () => {
        await fetchNextPage()
    }, [fetchNextPage])

    return (
        <section className="my-5">
            <SectionContainer className="space-y-3">
                <h2 className="text-3xl font-semibold">Reviews</h2>
                <ReviewForm blogId={blogId} />
                {
                    isLoading ? <ReviewsLoading /> :
                        <Reviews>
                            {
                                blogReviews?.pages?.map(blogReviews => (
                                    <Fragment key={crypto.randomUUID()}>
                                        {
                                            blogReviews.data.map(blogReview => (
                                                <Review key={blogReview.id} review={blogReview} />
                                            ))
                                        }
                                    </Fragment>
                                ))
                            }

                            <ReviewLoader hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} onLoadMore={handleLoadMore} />
                        </Reviews>
                }
            </SectionContainer>
        </section>
    );
}

export default BlogReviewsSection