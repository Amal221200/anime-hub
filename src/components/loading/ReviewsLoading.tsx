import React from 'react'
import { cn } from '@/lib/utils'
import { Skeleton } from '../ui/skeleton'

const ReviewsLoading = () => {
    const arr = (new Array(3)).fill(0)
    return (
        <div className='my-5 space-y-2 sm:space-y-4'>
            {
                arr.map((_, i) =>
                    <article key={i} className="group rounded p-2">
                        <div className="flex items-center gap-x-2 sm:gap-x-4">
                            <Skeleton className="rounded-full p-4" />

                            <Skeleton className="w-[150px] p-3" />
                        </div>
                    </article>
                )
            }
        </div>
    )
}

export default ReviewsLoading