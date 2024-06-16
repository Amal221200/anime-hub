import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { editBlogReview } from "@/lib/actions/blog-review";

export default function useEditBlogReview(review: { blogId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const handleEdit = useCallback((reviewId: string) => {
        return async (data: { review: string }) => {
            await editBlogReview(reviewId, data.review)
        }
    }, [])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`edit_blog_review`, review.blogId, review.reviewId],
        mutationFn: handleEdit(review.reviewId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`blog_reviews`, review.blogId] })
            toast.success("REVIEW EDITED", {})
        },
        onError(error) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        editMutation: mutateAsync,
        editPending: isPending
    }
}