"use client"
import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import { FormEvent, useCallback } from "react"
import SelectInput from "../SelectInput"
import { Input } from "../ui/input"
import { ANIME_STATUS } from "@prisma/client"
import { useSearchParams } from "next/navigation"

interface AnimeSearchBoxProps {
    handleSearch: (payload: { query: string, genre: string, artist: string, status: string, studio: string, fromYear: number, toYear: number }) => Promise<void>,
    placeholder?: string,
    className?: string,
    artists: { artist: string }[], studios: { studio: string }[], genres: string[],
}

const AnimeSearchBox = ({ handleSearch, className, placeholder, genres, artists, studios }: AnimeSearchBoxProps) => {
    const searchParams = useSearchParams()

    const defaultQuery = searchParams.get('query') ?? ''
    const defaultGenre = searchParams.get('genre') ?? ''
    const defaultArtist = searchParams.get('artist') ?? ''
    const defaultStudio = searchParams.get('studio') ?? ''
    const defaultStatusParam = searchParams.get('status') ?? ''
    const defaultStatus = defaultStatusParam === 'ongoing' ? 'ONGOING' : defaultStatusParam === 'completed' ? 'COMPLETED' : undefined
    const defaultFromYear = searchParams.get('fromYear') ?? ''
    const defaultToYear = searchParams.get('toYear') ?? ''
    
    const onSearch = useCallback((e: FormEvent) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const query = formData.get('search')?.toString().trim()!
        const genre = formData.get('genre')?.toString().trim()!
        const artist = formData.get('artist')?.toString().trim()!
        const studio = formData.get('studio')?.toString().trim()!
        const status = formData.get('status')?.toString().trim()!
        const fromYear = parseInt(formData.get('from-year')?.toString().trim()!)
        const toYear = parseInt(formData.get('to-year')?.toString().trim()!)

        handleSearch({
            query, genre: genre === 'none' ? '' : genre,
            artist: artist === 'none' ? '' : artist,
            studio: studio === 'none' ? '' : studio,
            status,
            fromYear: fromYear || 0,
            toYear: toYear || 0
        })
    }, [handleSearch])

    return (
        <search>
            <form onSubmit={onSearch} className={cn("mx-auto md:w-[60vw] sm:[60vw] w-[100vw] overflow-hidden space-y-3", className)}>
                <div className={cn("flex mx-auto items-center overflow-hidden rounded-full md:w-[50vw] sm:w-[60vw] w-[80vw] bg-zinc-800")}>
                    <input defaultValue={defaultQuery} type="text" name="search" id="search" className="w-[95%] rounded-full bg-transparent px-3 py-2 outline-none" placeholder={placeholder || 'Search ...'} />
                    <button type="submit">
                        <Search size={20} className="mr-3" />
                    </button>
                </div>

                {/* Filters */}
                <div className="space-y-3">
                    <div className="flex flex-wrap justify-center gap-2">
                        <div>
                            <label htmlFor="">Genre</label>
                            <SelectInput defaultValue={defaultGenre} name="genre" data={genres} placeholder="Genre" />
                        </div>
                        <div>
                            <label htmlFor="">Artist</label>
                            <SelectInput defaultValue={defaultArtist} name="artist" data={artists.map(({ artist }) => artist)} placeholder="Artist" />
                        </div>
                        <div>
                            <label htmlFor="">Studio</label>
                            <SelectInput defaultValue={defaultStudio} name="studio" data={studios.map(({ studio }) => studio)} placeholder="Studio" />
                        </div>
                        <div>
                            <label htmlFor="">Status</label>
                            <SelectInput defaultValue={defaultStatus} name="status" data={['ongoing', 'completed']} placeholder="Status" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <div>
                            <label htmlFor="">Year</label>
                            <div className="flex w-min flex-wrap justify-center gap-2 sm:w-max">
                                <Input defaultValue={defaultFromYear} name="from-year" type="number" className="w-[180px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="From" />
                                <Input defaultValue={defaultToYear} name="to-year" type="number" className="w-[180px] outline-none focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="To" />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </search>
    )
}

export default AnimeSearchBox