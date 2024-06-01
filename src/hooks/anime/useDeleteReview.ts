import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlertModal from "../useAlertModal";
import { AxiosError } from "axios";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";

export default function useDeleteReview(review: { animeId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const { actions } = use(ActionsContext) as ActionsProviderType;

    const handleDelete = useCallback((reviewId: string) => {
        return async () => {
            await actions.deleteAnimeReview(reviewId)
        }
    }, [actions])

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