import UserAvatar from "@/components/UserAvatar"
import { ReviewType } from "./functions"


const Review = ({ review }: { review: ReviewType }) => {

    return (
        <article className="flex items-center justify-between">
            <div className="flex items-center gap-x-2 sm:gap-x-4">
                <UserAvatar imageLink={review.user.imageUrl} username={review.user.username} />
                <p className="text-sm sm:text-base">{review.content}</p>
            </div>
        </article>
    )
}

export default Review