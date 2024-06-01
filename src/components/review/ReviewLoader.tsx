import React, { useCallback } from 'react'
import { Button } from '../ui/button'
import SkeletonSpinner from '../loading/SkeletonSpinner'

interface ReviewLoaderProps {
    hasNextPage: boolean,
    isFetchingNextPage: boolean,
    onLoadMore: () => Promise<void>
}

const ReviewLoader = ({ hasNextPage, isFetchingNextPage, onLoadMore }: ReviewLoaderProps) => {
    const handleLoadMore = useCallback(async() => {
        await onLoadMore()
    }, [onLoadMore])

    return (
        <>
            {(hasNextPage && !isFetchingNextPage) &&
                <div className="flex items-center justify-center">
                    <Button type="button" variant="outline" size="sm" onClick={handleLoadMore}>
                        Load More
                    </Button>
                </div>
            }

            {isFetchingNextPage && <SkeletonSpinner className="h-[5dvh]" />}
        </>
    )
}

export default ReviewLoader