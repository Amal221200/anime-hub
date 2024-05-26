"use client";

import UserAvatar from "@/components/UserAvatar"
import { ReviewType } from "./functions"
import { EllipsisVertical } from "lucide-react"
import { useSession } from "@clerk/nextjs";


const Review = ({ review }: { review: ReviewType }) => {
    const { session } = useSession()
    
    return (
        <article className="group flex cursor-pointer items-center justify-between rounded p-2 hover:bg-slate-900">
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                <UserAvatar imageLink={review.user.imageUrl} username={review.user.username} />
                <p className="text-sm sm:text-base">{review.content}</p>
            </div>

            {session?.user?.id === review.user.externalUserId && (
                <div className="hidden opacity-50 hover:opacity-100 group-hover:block">
                    <EllipsisVertical />
                </div>
            )}
        </article>
    )
}

export default Review