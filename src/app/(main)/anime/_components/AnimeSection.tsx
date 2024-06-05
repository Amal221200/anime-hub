"use client";
import { ComponentProps, Fragment } from "react";
import { cn } from "@/lib/utils";
import AnimeCard from "../../_components/anime/AnimeCard";
import SectionContainer from "@/components/containers/SectionContainer"
import SkeletonSpinner from "@/components/loading/SkeletonSpinner";
import useFetchInfinitAnimes from "@/hooks/anime/useFetchInfiniteAnimes";
import SectionLoading from "@/components/loading/SectionLoading";
interface AnimeSectionProps extends ComponentProps<'div'> {
    searchQuery: string;
    heading?: string;
}

const AnimeSection = ({ heading, className, searchQuery }: AnimeSectionProps) => {
    const { animes, status, intersectingRef, isFetchingNextPage } = useFetchInfinitAnimes()

    return (
        <section className={cn("my-5", className)}>
            <SectionContainer>
                {
                    status === 'pending' ?
                        <SectionLoading /> : status === 'error' ?
                            <h1>Error...</h1> :
                            (
                                <>
                                    <h2 className="mb-3 text-3xl font-semibold">{heading || 'Popular Anime'}</h2>
                                    <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {
                                            animes?.pages[0].data.length ? animes?.pages?.map((animes) => (
                                                <Fragment key={crypto.randomUUID()}>
                                                    {
                                                        animes.data.map((anime) => (
                                                            <AnimeCard anime={anime} key={anime.id} />
                                                        ))
                                                    }
                                                </Fragment>
                                            )) : <h1>No results found</h1>
                                        }
                                    </div>
                                    {isFetchingNextPage && (
                                        <SkeletonSpinner className="h-[10vh]" />
                                    )}
                                    <div ref={intersectingRef} className="h-5" />
                                </>
                            )
                }
            </SectionContainer>
        </section>
    );
}

export default AnimeSection;