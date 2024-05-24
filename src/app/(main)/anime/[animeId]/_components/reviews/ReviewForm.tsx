"use client"
// import { useFormStatus } from "react-dom"
import { FormEvent } from "react"

const ReviewForm = ({ handleSubmit, isLoading }: { handleSubmit: (e: FormEvent) => void, isLoading?: boolean }) => {

    return (
        <form className="my-4 space-y-2" onSubmit={handleSubmit}>
            <textarea name="review" id="review" placeholder="Add a review" className="block w-full resize-none rounded-md bg-zinc-800 px-2 py-1 outline-none" required rows={4} />
            <button disabled={isLoading} type="submit"
                className="mr-auto block w-full rounded-md bg-yellow-950 px-3 py-1 text-base text-white disabled:cursor-not-allowed disabled:opacity-70 sm:w-min sm:text-lg">
                Submit
            </button>
        </form>
    )
}

export default ReviewForm