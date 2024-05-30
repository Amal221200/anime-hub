import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlertModal from "../useAlertModal";
import { deleteReview } from "../functions/review";
import { AxiosError } from "axios";

export default function useDeleteReview(review: { animeId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`delete review`, review.animeId, review.reviewId],
        mutationFn: deleteReview(review.animeId, review.reviewId),
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