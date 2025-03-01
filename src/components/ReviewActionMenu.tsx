"use client"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Pencil, Trash } from "lucide-react"
import { ReactNode } from "react"

interface ReviewActionMenuProps {
    children: ReactNode,
    className: string,
    open: boolean,
    onOpenChage: () => void,
    onEdit: Function,
    onDelete: Function
}

const ReviewActionMenu = ({ children, className, onOpenChage, open, onDelete, onEdit }: ReviewActionMenuProps) => {
    return (
        <Popover onOpenChange={onOpenChage} open={open}>
            <PopoverTrigger asChild className={cn("", className)}>
                {children}
            </PopoverTrigger>
            <PopoverContent align="end" side="top" className="flex w-max gap-2 border-zinc-700 p-2 text-sm">
                <button type="button" onClick={()=> onEdit()} className="block rounded bg-emerald-500 p-1 text-left outline-hidden transition-colors hover:bg-emerald-600">
                    <Pencil size={18} />
                </button>
                
                <button type="button"  onClick={()=> onDelete()} className="block rounded bg-red-500 p-1 text-left outline-hidden transition-colors hover:bg-red-600">
                    <Trash size={18} />
                </button>
            </PopoverContent>
        </Popover>
    )
}

export default ReviewActionMenu