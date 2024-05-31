"use client";
import { ComponentProps, Fragment } from "react";
import { cn } from "@/lib/utils";
import AnimeCard from "../../_components/anime/AnimeCard";
import SectionContainer from "@/components/containers/SectionContainer"
import SkeletonSpinner from "@/components/SkeletonSpinner";
import useFetchInfinitAnimes from "@/hooks/anime/useFetchInfiniteAnimes";
import useFetchInfinitBlogs from "@/hooks/blog/useFetchInfiteBlogs";
import BlogCard from "../../_components/blog/BlogCard";

interface BlogSectionProps extends ComponentProps<'div'> {
    searchQuery: string;
    heading?: string;
}

const BlogSection = ({ heading, className, searchQuery }: BlogSectionProps) => {
    const { blogs, status, intersectingRef, isFetchingNextPage, isLoading } = useFetchInfinitBlogs()

    return (
        <section className={cn("my-5", className)}>
            <SectionContainer>
                {
                    status === 'pending' ?
                        <SkeletonSpinner className="h-[30vh]" /> : status === 'error' ?
                            <h1>Error...</h1> :
                            (
                                <>
                                    <h2 className="mb-3 text-3xl font-semibold">{heading || 'Popular Anime'}</h2>
                                    <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                        {
                                            blogs?.pages[0].data.length ? blogs?.pages?.map((blogs) => (
                                                <Fragment key={crypto.randomUUID()}>
                                                    {
                                                        blogs.data.map((blog) => (
                                                            <BlogCard blog={blog} key={blog.id} />
                                                        ))
                                                    }
                                                </Fragment>
                                            )) : <h1>No results found</h1>
                                        }
                                    </div>
                                    {(isFetchingNextPage || isLoading) && (
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

export default BlogSection;