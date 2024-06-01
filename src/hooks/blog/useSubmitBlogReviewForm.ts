import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAlertModal from "../useAlertModal"
import { AxiosError } from "axios"
import { toast } from "sonner"
import { use, useCallback } from "react"
import { ActionsContext } from "@/components/providers/ActionsProvider"
import { ActionsProviderType } from "@/lib/types"
import { useUser } from "@clerk/nextjs"

export default function useSubmitBlogReview(blogId: string) {
    const queryClient = useQueryClient()

    const { onOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;
    const { user } = useUser()

    const handleAdd = useCallback((blogId: string) => {
        return async (data: { review: string }) => {
            if (!user) {
                return onOpen({ title: 'Unauthorizes', description: "Please login" })
            }
            await actions.addBlogReview(blogId, user.id, data.review)
        }
    }, [actions, onOpen, user])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, blogId],
        mutationFn: handleAdd(blogId),
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: [`blog_reviews`, blogId] })
            toast.success('SUCCESS', { description: 'Review added successfully' })
        }
    })

    return {
        mutateAsync,
        isPending
    }
}