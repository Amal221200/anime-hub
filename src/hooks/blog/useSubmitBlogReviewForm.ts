import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAlertModal from "../useAlertModal"
import { toast } from "sonner"
import { useCallback } from "react"
import { useUser } from "@clerk/nextjs"
import { addBlogReview } from "@/lib/actions/blog-review"

export default function useSubmitBlogReview(blogId: string) {
    const queryClient = useQueryClient()

    const { onOpen } = useAlertModal()
    const { user } = useUser()

    const handleAdd = useCallback((blogId: string) => {
        return async (data: { review: string }) => {
            if (!user) {
                return onOpen({ title: 'Unauthorizes', description: "Please login" })
            }
            await addBlogReview(blogId, user.id, data.review)
        }
    }, [onOpen, user])

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, blogId],
        mutationFn: handleAdd(blogId),
        onError(error) {
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