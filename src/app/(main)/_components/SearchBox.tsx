"use client"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { ComponentProps, FormEvent, useCallback } from "react"

interface SearchBoxProps extends ComponentProps<'form'> {
    handleSearch: (e: FormEvent) => Promise<void>
    mobile?: boolean,
}

const SearchBox = ({ handleSearch, className, mobile, ...props }: SearchBoxProps) => {
    return (
        <search>
            <form onSubmit={handleSearch} {...props} className={cn("items-center overflow-hidden rounded-full bg-zinc-800", mobile ? "mx-auto mb-2 flex w-[80vw] items-center sm:hidden" : "hidden sm:flex w-[50vw]")}>
                <input type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder="Search anime" />
                <button type="submit">
                    <Search size={20} className="mr-3" />
                </button>
            </form>
        </search>
    )
}

export default SearchBox