"use client"
// import { useFormStatus } from "react-dom"
import { FormEvent } from "react"

const ReviewForm = ({ handleSubmit, isLoading }: { handleSubmit: (e: FormEvent) => void, isLoading?: boolean }) => {

    return (
        <form className="my-4 flex items-center gap-2" onSubmit={handleSubmit}>
            <textarea name="review" id="review" placeholder="Add a review" className="flex-1 resize-none rounded-md bg-zinc-800 px-2 py-1 outline-none" required />
            <button disabled={isLoading} type="submit"
                className="rounded-md bg-yellow-950 px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-70">
                Submit
            </button>
        </form>
    )
}

export default ReviewForm