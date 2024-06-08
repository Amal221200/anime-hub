"use client";
import UserAvatar from "@/components/UserAvatar"
import { AnimeReviewType } from "@/lib/types";
import { EllipsisVertical } from "lucide-react"
import { useSession } from "@clerk/nextjs";
import ReviewActionMenu from "@/components/ReviewActionMenu";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import useDeleteReview from "@/hooks/anime/useDeleteReview";
import dateFormatter from "@/utils/dateFormatter";
import useDialogModal from "@/hooks/useDialogModal";
import EditReview from "./EditReview";

const Review = ({ review }: { review: AnimeReviewType }) => {
    const { session } = useSession()
    const [menuOpen, setMenuOpen] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const { onOpen: onDialogOpen } = useDialogModal()
    const { deleteMutation, deletePending } = useDeleteReview({ reviewId: review.id, animeId: review.animeId })
    const toggleMenuOpen = useCallback(() => {
        if (editMode) {
            return
        }
        setMenuOpen((current) => !current)
    }, [editMode])
 
    const isSame = useMemo(()=> review.createdAt.toISOString() === review.updatedAt.toISOString(), [review])

    const onDelete = useCallback(async () => {
        if (deletePending) {
            return
        }

        onDialogOpen({
            title: "Are you sure?", description: "Do you want to delete this review?", async action() {
                await deleteMutation()
            }
        })
        setMenuOpen(false)
    }, [deleteMutation, deletePending, onDialogOpen])

    const onEdit = useCallback(() => {
        setMenuOpen(false)
        setEditMode(true)
    }, [])

    const onCancel = useCallback(() => {
        setEditMode(false)
    }, [])

    if (editMode) {
        return <EditReview review={review} onCancel={onCancel} />
    }

    return (
        <article className={cn("group flex transition-all cursor-pointer items-center justify-between rounded p-2 hover:bg-zinc-900/80", menuOpen && "bg-zinc-900/80")}>
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                <UserAvatar imageLink={review.user.imageUrl} username={review.user.username} />
                <div className="w-full">
                    <small className="block text-left text-xs text-muted-foreground">
                        {isSame ? '(reviewed)' : '(edited)'} {dateFormatter(review.createdAt)}
                    </small>
                    <p className="text-sm sm:text-base">{review.review}</p>
                </div>
            </div>

            {session?.user?.id === review.user.externalUserId && (
                <ReviewActionMenu className={cn("opacity-70 hover:opacity-100", editMode && "cursor-null opacity-70")}
                    onOpenChage={toggleMenuOpen} open={menuOpen} onEdit={onEdit} onDelete={onDelete}>
                    <EllipsisVertical />
                </ReviewActionMenu>
            )}
        </article>
    )
}

export default Review