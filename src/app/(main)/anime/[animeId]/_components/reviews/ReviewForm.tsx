"use client"

import { FormEvent } from "react"

const ReviewForm = ({ handleSubmit }: { handleSubmit: (e: FormEvent) => void }) => {
    return (
        <form className="flex items-center gap-2" onSubmit={handleSubmit}>
            <textarea name="review" id="review" placeholder="Add a review" className="w-[80%] resize-none rounded-md bg-[#eee] px-2 py-1 outline-none" required />
            <button type="submit" className="rounded-md bg-yellow-950 px-2 py-1 text-white">Submit</button>
        </form>
    )
}

export default ReviewForm