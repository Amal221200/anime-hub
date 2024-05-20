"use client";
import SectionContainer from "@/components/containers/SectionContainer"
import { cn } from "@/lib/utils";
import { QueryFunctionContext, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts"
import { ComponentProps, Fragment, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { Anime } from "@prisma/client";
import AnimeCard from "./AnimeCard";

interface AnimeSectionProps extends ComponentProps<'div'> {
    query: string;
    heading?: string;
}

const AnimeSection = ({ heading, className, query }: AnimeSectionProps) => {
    const queryClient = useQueryClient()
    const { isIntersecting, ref } = useIntersectionObserver({ threshold: 1 });

    const fetchAnimes = useCallback(async ({ pageParam }: { pageParam: number }): Promise<{ data: Anime[], currentPage: number, nextPage: number | null }> => {
        const response = await axios.get(`/api/anime?query=${query || ''}&page=${pageParam}`);
        const { animes, totalPages, page } = response.data
        return {
            data: animes, currentPage: page, nextPage: pageParam < totalPages ? pageParam + 1 : null
        }
    }, [query])


    const { data: animes, isError, isLoading, fetchNextPage } = useInfiniteQuery({
        queryKey: ['animes'],
        queryFn: fetchAnimes,
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1
    }, queryClient)

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage()
        }
    }, [isIntersecting, fetchNextPage])

    if (isLoading) {
        return <h1>Loading</h1>
    }

    if (isError) {
        return <h1>Failed to fetch</h1>
    }

    // if(isFetched && animes)
    return (
        <section className={cn("my-5", className)}>
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-semibold">{heading || 'Popular Anime'}</h2>
                <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {
                        animes?.pages[0].data.length ? animes?.pages?.map((animes) => (
                            <Fragment key={crypto.randomUUID()}>
                                {
                                    animes.data.map((anime, ind) => (
                                        <AnimeCard anime={anime} key={anime.id} />
                                    ))
                                }
                            </Fragment>
                        )) : <h1>No results found</h1>
                    }
                    <i ref={ref} />
                </div>
            </SectionContainer>
        </section>
    );
}

export default AnimeSection;