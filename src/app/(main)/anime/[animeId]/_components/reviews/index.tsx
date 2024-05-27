"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { useSession } from "@clerk/nextjs";
import { FormEvent, Fragment, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import Review from "./Review";
import SkeletonSpinner from "@/components/SkeletonSpinner";
import useAlertModal from "@/hooks/useAlertModal";
import useFetchInfiniteReviews from "@/hooks/anime/useFetchInfiniteReviews";
import useSubmitAnimeReview from "@/hooks/anime/useSubmitAnimeReviewForm";

const ReviewsSection = ({ animeId }: { animeId: string }) => {
    const { isSignedIn } = useSession()
    const { onOpen } = useAlertModal()

    const { reviews, isLoading } = useFetchInfiniteReviews(animeId)

    const { mutateAsync, isPending } = useSubmitAnimeReview(animeId)

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        if (!isSignedIn) {
            return onOpen({ title: 'Unauthorized', description: "Please sign in to review." })
        }

        const formData = new FormData(form)
        const review = formData.get('review')?.toString()!
        await mutateAsync({ review })
        form.reset()
    }, [isSignedIn, mutateAsync, onOpen])

    return (
        <section className="my-5">
            <SectionContainer className="space-y-3">
                <h2 className="text-3xl font-semibold">Reviews</h2>
                <ReviewForm handleSubmit={handleSubmit} isLoading={isPending} />
                {
                    isLoading ? <SkeletonSpinner className="h-[15vh]" /> :
                        <Reviews className="">
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
                        </Reviews>
                }
            </SectionContainer>
        </section>
    );
}

export default ReviewsSection