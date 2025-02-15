"use client";
import useDraggableScroll from "@/hooks/useDraggableScroll";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface HorizontalScrollableContainerProps extends PropsWithChildren {
    elements?: number
}

const HorizontalScrollableContainer = ({ children, elements = 3 }: HorizontalScrollableContainerProps) => {
    const ref = useDraggableScroll();
    const getColumClass = ()=> {
        return `grid-cols-[repeat(${elements},auto)]`
    }
    return (
        <div ref={ref} className={cn("no-scrollbar cursor-grab active:cursor-grabbing grid items-center gap-x-3 overflow-x-scroll", getColumClass())} style={{ WebkitOverflowScrolling: 'touch' }}>
            {children}
        </div>
    )
}

export default HorizontalScrollableContainer
