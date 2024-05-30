"use client"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { FormEvent, useCallback } from "react"

interface SearchBoxProps {
    handleSearch: (query: string) => Promise<void>,
    placeholder?: string,
    className?: string
}

const SearchBox = ({ handleSearch, className, placeholder }: SearchBoxProps) => {
    const onSearch = useCallback((e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const query = formData.get('search')?.toString().trim()!
        handleSearch(query)
    }, [handleSearch])
    
    return (
        <search>
            <form onSubmit={onSearch} className={cn("mx-auto md:w-[50vw] sm:[60vw] w-[70vw] flex items-center overflow-hidden rounded-full bg-zinc-800", className)}>
                <input type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder={placeholder || 'Search ...'} />
                <button type="submit">
                    <Search size={20} className="mr-3" />
                </button>
            </form>
        </search>
    )
}

export default SearchBox