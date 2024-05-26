"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@clerk/nextjs";
import { FormEvent, Fragment, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, getReviews } from "./functions";
import Reviews from "./Reviews";
import Review from "./Review";
import SkeletonSpinner from "@/components/SkeletonSpinner";
import useAlertModal from "@/hooks/useAlertModal";
import { AxiosError } from "axios";

const ReviewsSection = ({ animeId }: { animeId: string }) => {
    const queryClient = useQueryClient()
    const { isSignedIn } = useSession()
    const { onOpen } = useAlertModal()
    const { toast } = useToast()

    const { data: reviews, isLoading } = useInfiniteQuery({
        queryKey: [`reviews ${animeId}`],
        queryFn: getReviews(animeId),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    }, queryClient)

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews ${animeId}`],
        mutationFn: addReview(animeId),
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews ${animeId}`] })
            toast({ title: 'SUCCESS', description: 'Review added successfully', variant: 'success' })
        }
    })

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
                                reviews?.pages && reviews.pages.map(reviews => (
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