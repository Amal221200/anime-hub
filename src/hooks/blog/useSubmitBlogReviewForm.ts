import { useMutation, useQueryClient } from "@tanstack/react-query"
import useAlertModal from "../useAlertModal"
import { AxiosError } from "axios"
import { addBlogReview } from "../functions/blog-review"
import { toast } from "sonner"

export default function useSubmitBlogReview(blogId: string) {
    const queryClient = useQueryClient()

    const { onOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`reviews`, blogId],
        mutationFn: addBlogReview(blogId),
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