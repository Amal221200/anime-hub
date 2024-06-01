import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";

export default function useEditBlogReview(review: { blogId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;

    const handleEdit = useCallback((reviewId: string) => {
        return async (data: { review: string }) => {
            await actions.editBlogReview(reviewId, data.review)
        }
    }, [actions])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`edit_blog_review`, review.blogId, review.reviewId],
        mutationFn: handleEdit(review.reviewId),
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