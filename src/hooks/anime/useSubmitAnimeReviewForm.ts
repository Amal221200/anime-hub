import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAlertModal from "../useAlertModal"
import { toast } from "sonner"
import { useUser } from "@clerk/nextjs"
import { useCallback } from "react"
import { addAnimeReview } from "@/lib/actions/anime-review"

export default function useSubmitAnimeReview(animeId: string) {
    const queryClient = useQueryClient()
    const { onOpen } = useAlertModal()
    const { user } = useUser()

    const handleAdd = useCallback((animeId: string) => {
        return async (data: { review: string }) => {
            if (!user) {
                return onOpen({ title: 'Unauthorizes', description: "Please login" })
            }
            await addAnimeReview(data.review, user.id, animeId)
        }
    }, [onOpen, user])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, animeId],
        mutationFn: handleAdd(animeId),
        onError(error) {
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