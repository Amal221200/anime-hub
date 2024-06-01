import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAlertModal from "../useAlertModal"
import { toast } from "sonner"
import { AxiosError } from "axios"
import { useUser } from "@clerk/nextjs"
import { use, useCallback } from "react"
import { ActionsContext } from "@/components/providers/ActionsProvider"
import { ActionsProviderType } from "@/lib/types"

export default function useSubmitAnimeReview(animeId: string) {
    const queryClient = useQueryClient()
    const { onOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;
    const { user } = useUser()

    const handleAdd = useCallback((animeId: string) => {
        return async (data: { review: string }) => {
            if (!user) {
                return onOpen({ title: 'Unauthorizes', description: "Please login" })
            }
            await actions.addAnimeReview(data.review, user.id, animeId)
        }
    }, [actions, onOpen, user])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, animeId],
        mutationFn: handleAdd(animeId),
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