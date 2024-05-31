import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addReview } from "../functions/anime-review"
import useAlertModal from "../useAlertModal"
import { toast } from "sonner"
import { AxiosError } from "axios"

export default function useSubmitAnimeReview(animeId: string) {
    const queryClient = useQueryClient()

    const { onOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, animeId],
        mutationFn: addReview(animeId),
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews`, animeId] })
            toast.success('SUCCESS', { description: 'Review added successfully' })
        }
    })

    return {
        mutateAsync,
        isPending
    }
}