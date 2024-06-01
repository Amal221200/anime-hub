import React from 'react'
import ItemLoading from './ItemLoading'
import { Skeleton } from '../ui/skeleton'

const SectionLoading = () => {
    const arr = (new Array(6)).fill(0)
    return (
        <>
            <Skeleton className='mb-4 h-[30px] w-[200px] p-5' />
            <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {
                    arr.map((_, i) => (
                        <ItemLoading key={i} />
                    ))
                }
            </div>
        </>
    )
}

export default SectionLoading