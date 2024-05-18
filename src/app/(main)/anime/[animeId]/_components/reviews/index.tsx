"use client"

import SectionContainer from "@/components/containers/SectionContainer";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { FormEvent, useCallback, useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewsSection = ({ animeId }: { animeId: string }) => {
    const { data: user, status } = useSession()
    const { toast } = useToast()
    const [reviews, setReviews] = useState(null);

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        if (status === 'unauthenticated') {

            return toast({ title: "Unauthorized", description: "Please login to add a review.", variant: "destructive" })
        }

        // const formData = new FormData(e.target);
        // addReview({ content: formData.get("review"), anime: animeId }).then((res) => {
        //     setReviews((current) => [res, ...current]);
        //     e.target.reset();
        // });
    }, [status, toast])



    return (
        <section className="my-5">
            <SectionContainer>
                <h2 className="text-3xl font-bold">Reviews</h2>
                <ReviewForm handleSubmit={handleSubmit} />
                {/* <Reviews reviews={reviews} /> */}
            </SectionContainer>
        </section>
    );
}

export default ReviewsSection