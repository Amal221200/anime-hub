"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { Fragment, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import Review from "./Review";
import useFetchInfiniteReviews from "@/hooks/anime/useFetchInfiniteReviews";
import ReviewsLoading from "@/components/loading/ReviewsLoading";
import ReviewLoader from "@/components/review/ReviewLoader";

const ReviewsSection = ({ animeId }: { animeId: string }) => {
    const { reviews, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useFetchInfiniteReviews(animeId)

    const handleLoadMore = useCallback(async () => {
        await fetchNextPage()
    }, [fetchNextPage])

    return (
        <section className="my-5">
            <SectionContainer className="space-y-3">
                <h2 className="text-3xl font-semibold">Reviews</h2>
                <ReviewForm animeId={animeId} />
                {
                    isLoading ? <ReviewsLoading /> :
                        <Reviews>
                            {
                                reviews?.pages?.map(reviews => (
                                    <Fragment key={crypto.randomUUID()}>
                                        {
                                            reviews.data.map(review => (
                                                <Review key={review.id} review={review} />
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

export default ReviewsSection