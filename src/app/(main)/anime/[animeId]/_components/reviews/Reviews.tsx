import { cn } from '@/lib/utils'
import React, { ComponentProps, ReactNode } from 'react'

const Reviews = ({ children, className, ...props }: ComponentProps<'div'>) => {
  return (
    <div className={cn('my-5 sm:space-y-4 space-y-2', className)} {...props}>
      {children}
    </div>
  )
}

export default Reviews