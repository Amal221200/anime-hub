"use client"
import SectionContainer from "@/components/containers/SectionContainer";
import { useSession } from "@clerk/nextjs";
import { FormEvent, Fragment, useCallback } from "react";
import ReviewForm from "./ReviewForm";
import Reviews from "./Reviews";
import Review from "./Review";
import SkeletonSpinner from "@/components/loading/SkeletonSpinner";
import useAlertModal from "@/hooks/useAlertModal";
import useFetchInfiniteBlogReviews from "@/hooks/blog/useFetchInfiniteBlogReviews";
import useSubmitBlogReview from "@/hooks/blog/useSubmitBlogReviewForm";

const BlogReviewsSection = ({ blogId }: { blogId: string }) => {
    const { isSignedIn } = useSession()
    const { onOpen } = useAlertModal()

    const { blogReviews, isLoading } = useFetchInfiniteBlogReviews(blogId)

    const { mutateAsync, isPending } = useSubmitBlogReview(blogId)

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
                        </Reviews>
                }
            </SectionContainer>
        </section>
    );
}

export default BlogReviewsSection