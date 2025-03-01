"use client"
import useSubmitBlogReview from "@/hooks/blog/useSubmitBlogReviewForm"
import useAlertModal from "@/hooks/useAlertModal"
import { useSession } from "@clerk/nextjs"
import { FormEvent, useCallback } from "react"

const ReviewForm = ({ blogId }: { blogId: string }) => {
    const { isSignedIn } = useSession()
    const { onOpen } = useAlertModal()
    
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
        <form className="my-4 space-y-2" onSubmit={handleSubmit}>
            <textarea name="review" id="review" placeholder="Add a review" className="block w-full resize-none rounded-md bg-zinc-800 px-2 py-1 outline-hidden" required rows={4} />
            <button disabled={isPending} type="submit"
                className="mr-auto block w-full rounded-md bg-yellow-950 px-3 py-1 text-base text-white disabled:cursor-null disabled:opacity-70 sm:w-min sm:text-lg">
                Submit
            </button>
        </form>
    )
}

export default ReviewForm