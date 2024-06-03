import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlertModal from "../useAlertModal";
import { AxiosError } from "axios";
import {  useCallback } from "react";
import { deleteAnimeReview } from "@/lib/actions/anime-review";

export default function useDeleteReview(review: { animeId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const handleDelete = useCallback((reviewId: string) => {
        return async () => {
            await deleteAnimeReview(reviewId)
        }
    }, [])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`delete review`, review.animeId, review.reviewId],
        mutationFn: handleDelete(review.reviewId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews`, review.animeId] })
            toast.success("REVIEW DELETED")
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        deleteMutation: mutateAsync,
        deletePending: isPending
    }
}