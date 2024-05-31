import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBlogReview } from "../functions/blog-review";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useAlertModal from "../useAlertModal";

export default function useEditBlogReview(review: { blogId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`edit_blog_review`, review.blogId, review.reviewId],
        mutationFn: editBlogReview(review.blogId, review.reviewId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`blog_reviews`, review.blogId] })
            toast.success("REVIEW EDITED", {})
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        editMutation: mutateAsync,
        editPending: isPending
    }
}