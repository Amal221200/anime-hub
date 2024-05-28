import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReview } from "../functions/review";
import { AxiosError } from "axios";
import { toast } from "sonner";
import useAlertModal from "../useAlertModal";

export default function useEditReview(review: { animeId: string, reviewId: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`edit review ${review.animeId}`],
        mutationFn: editReview(review.animeId, review.reviewId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews ${review.animeId}`] })
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