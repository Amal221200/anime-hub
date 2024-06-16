import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { editAnimeReview } from "@/lib/actions/anime-review";

export default function useEditReview(review: { animeId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()


    const handleEdit = useCallback((reviewId: string) => {
        return async (data: { review: string }) => {
            await editAnimeReview(reviewId, data.review)
        }
    }, [])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`edit review`, review.animeId, review.reviewId],
        mutationFn: handleEdit(review.reviewId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews`, review.animeId] })
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