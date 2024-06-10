import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts";
import { useCallback, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Anime, ANIME_STATUS } from "@prisma/client";
import { getAnimes } from "@/lib/actions/anime";


export default function useFetchInfinitAnimes() {
    const queryClient = useQueryClient()
    const { isIntersecting, ref: intersectingRef } = useIntersectionObserver({ threshold: 0.5 });
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const query = searchParams.get('query') ?? ''
    const genre = searchParams.get('genre') ?? ''
    const artist = searchParams.get('artist') ?? ''
    const studio = searchParams.get('studio') ?? ''
    const statusParam = searchParams.get('status') ?? ''
    const status = statusParam === 'ongoing' ? 'ONGOING' : statusParam === 'completed' ? 'COMPLETED' : undefined
    const fromYear = searchParams.get('fromYear') ?? ''
    const toYear = searchParams.get('toYear') ?? ''

    const handleFetch = useCallback(({ artist, query, studio, genre, fromYear, toYear, status }: { query: string, artist: string, studio: string, genre: string, fromYear: number, toYear: number, status?: ANIME_STATUS }) => {
        return async ({ pageParam }: { pageParam: number }): Promise<{ data: Anime[], currentPage: number, nextPage: number | null }> => {
            const { animes, page, totalPages } = await getAnimes({ query, fromYear, status, toYear, genre, studio, artist, page: pageParam, totalAnimes: 12 })

            return {
                data: animes!, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
            }
        }
    }, [])

    const { data: animes, status: fetchStatus, fetchNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery({
        queryKey: ['fetch_animes', {
            query,
            artist,
            genre,
            studio,
            status,
            fromYear,
            toYear,
        }],
        queryFn: handleFetch({
            query,
            artist,
            genre,
            studio,
            status,
            fromYear: parseInt(fromYear!),
            toYear: parseInt(toYear!),
        }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        enabled: pathname.startsWith('/anime')
    }, queryClient)

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage()
        }
    }, [isIntersecting, fetchNextPage])

    return {
        animes,
        status: fetchStatus,
        isFetchingNextPage,
        isLoading,
        intersectingRef,
        refetch
    }
}