"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@clerk/nextjs";
import { FormEvent, Fragment, useCallback, useState } from "react";
import ReviewForm from "./ReviewForm";
import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addReview, getReviews } from "./functions";
import Reviews from "./Reviews";
import Review from "./Review";

const ReviewsSection = ({ animeId }: { animeId: string }) => {
    const queryClient = useQueryClient()
    const { isSignedIn } = useSession()
    const { toast } = useToast()

    const { data: reviews } = useInfiniteQuery({
        queryKey: [`reviews ${animeId}`],
        queryFn: getReviews(animeId),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    }, queryClient)

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews ${animeId}`],
        mutationFn: addReview(animeId),
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: [`reviews ${animeId}`] })
        }
    })

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        if (!isSignedIn) {
            return toast({ title: "Unauthorized", description: "Please login to add a review.", variant: "destructive" })
        }

        const formData = new FormData(form)
        const review = formData.get('review')?.toString()!
        await mutateAsync({ review })
        form.reset()
    }, [isSignedIn, toast, mutateAsync])

    return (
        <section className="my-5">
            <SectionContainer className="space-y-3">
                <h2 className="text-3xl font-semibold">Reviews</h2>
                <ReviewForm handleSubmit={handleSubmit} isLoading={isPending} />
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
            </SectionContainer>
        </section>
    );
}

export default ReviewsSection