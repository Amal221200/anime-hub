"use client";
import { ComponentProps, Fragment, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useIntersectionObserver } from "usehooks-ts"

import useSearchQuery from "@/hooks/useSearchQuery";

import { fetchAnimes } from "./functions";

import AnimeCard from "../../_components/AnimeCard";
import SectionContainer from "@/components/containers/SectionContainer"
import SkeletonSpinner from "@/components/SkeletonSpinner";

interface AnimeSectionProps extends ComponentProps<'div'> {
    searchQuery: string;
    heading?: string;
}

const AnimeSection = ({ heading, className, searchQuery }: AnimeSectionProps) => {
    const queryClient = useQueryClient()
    const { searchQuery: currentSearchQuery } = useSearchQuery()
    const { isIntersecting, ref } = useIntersectionObserver({ threshold: 0.5 });

    const { data: animes, status, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
        queryKey: ['animes'],
        queryFn: fetchAnimes(currentSearchQuery, searchQuery),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
    }, queryClient)

    useEffect(() => {
        if (isIntersecting) {
            fetchNextPage()
        }
    }, [isIntersecting, fetchNextPage])

    return (
        <section className={cn("my-5", className)}>
            <SectionContainer>
                {
                    status === 'pending' ?
                        <SkeletonSpinner className="h-[30vh]" /> : status === 'error' ?
                            <h1>Erorr...</h1> :
                            (
                                <>
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
                                    </div>
                                    {(isFetchingNextPage || isLoading) && (
                                        <SkeletonSpinner className="h-[10vh]" />
                                    )}
                                    <div ref={ref} className="h-5" />
                                </>
                            )
                }
            </SectionContainer>
        </section>
    );
}

export default AnimeSection;