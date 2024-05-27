import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addReview } from "../functions/review"
import useAlertModal from "../useAlertModal"
import { useToast } from "@/components/ui/use-toast"
import { AxiosError } from "axios"

export default function useSubmitAnimeReview(animeId: string) {
    const queryClient = useQueryClient()

    const { onOpen } = useAlertModal()
    const { toast } = useToast()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews ${animeId}`],
        mutationFn: addReview(animeId),
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`reviews ${animeId}`] })
            toast({ title: 'SUCCESS', description: 'Review added successfully', variant: 'success' })
        }
    })

    return {
        mutateAsync,
        isPending
    }
}