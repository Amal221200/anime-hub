import SectionContainer from '@/components/containers/SectionContainer'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import React from 'react'
import ItemLoading from './ItemLoading'

const SectionLoading = () => {
    const arr = (new Array(12)).fill(0)
    return (
        <section>
            <SectionContainer>
                <Skeleton className='mb-4 h-[30px] w-[200px] p-5' />
                <div className="no-scrollbar grid grid-cols-[repeat(13,auto)] items-center gap-x-3 overflow-x-scroll">
                    {
                        arr.map((_, i) => (
                            <ItemLoading key={i} home />
                        ))
                    }
                </div>
            </SectionContainer>
        </section>
    )
}

export default SectionLoading