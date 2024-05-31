"use client"

import { Button } from "@/components/ui/button"
import useEditBlogReview from "@/hooks/blog/useEditBlogReview"
import { BlogReview } from "@prisma/client"
import { FormEvent, useCallback } from "react"

const EditReview = ({ review, onCancel }: { review: BlogReview, onCancel: () => void }) => {
    const { editMutation, editPending } = useEditBlogReview({ blogId: review.blogId, reviewId: review.id })

    const handleSubmit = useCallback(async (e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const newReview = formData.get('new-review')?.toString()!
        await editMutation({ review: newReview })

        onCancel()
    }, [onCancel, editMutation])


    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <textarea name="new-review" id="new-review" placeholder="Edit review" className="block w-full resize-none rounded-md bg-zinc-800 px-2 py-1 text-sm outline-none sm:text-base" required rows={2} defaultValue={review.review} autoFocus />
            <div className="flex justify-end gap-x-2">
                <Button type="button" size="sm" className="text-xs sm:text-sm" variant="outline" disabled={editPending}
                    onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" size="sm" className="px-2 text-xs sm:px-4 sm:text-sm" variant="destructive" disabled={editPending}>
                    Submit
                </Button>
            </div>
        </form>
    )
}

export default EditReview