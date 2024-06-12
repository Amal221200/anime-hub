"use client"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { FormEvent, useCallback } from "react"
import { Input } from "../ui/input"

interface BlogSearchBoxProps {
    handleSearch: (payload: { query: string, fromYear: number, toYear: number }) => Promise<void>,
    placeholder?: string,
    className?: string
}

const BlogSearchBox = ({ handleSearch, className, placeholder }: BlogSearchBoxProps) => {
    const onSearch = useCallback((e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const query = formData.get('search')?.toString().trim()!
        const fromYear = parseInt(formData.get('from-year')?.toString().trim()!)
        const toYear = parseInt(formData.get('to-year')?.toString().trim()!)
        handleSearch({ query, fromYear: fromYear || 0, toYear: toYear || 0 })
    }, [handleSearch])

    return (
        <search>
            <form onSubmit={onSearch} className={cn("mx-auto md:w-[60vw] sm:[60vw] w-[90vw] overflow-hidden space-y-3", className)}>
                <div className={cn("flex mx-auto items-center overflow-hidden rounded-full md:w-[50vw] sm:w-[60vw] w-[80vw] bg-zinc-800")}>
                    <input type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder={placeholder || 'Search ...'} />
                    <button type="submit">
                        <Search size={20} className="mr-3" />
                    </button>
                </div>

                {/* Filters */}
                <div>
                    <div className="flex justify-center">
                        <div>
                            <label htmlFor="">Year</label>
                            <div className="flex w-min flex-wrap justify-center gap-2 sm:w-max">
                                <Input name="from-year" type="number" className="w-[180px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="From" />
                                <Input name="to-year" type="number" className="w-[180px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="To" />
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </search>
    )
}

export default BlogSearchBox