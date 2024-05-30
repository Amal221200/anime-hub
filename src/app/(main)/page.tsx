import dynamic from "next/dynamic";
import { getBlogs } from "@/lib/actions/blog";
import { getAnimes } from "@/lib/actions/anime";
import AnimeCard from "./_components/anime/AnimeCard";
import SkeletonSpinner from "@/components/SkeletonSpinner";
import Intro from "./_components/Intro";
import BlogCard from "./_components/blog/BlogCard";

const HomeAnimeSection = dynamic(() => import('./_components/anime/HomeAnimeSection'), { loading: () => <SkeletonSpinner className="h-[50vh]" /> })
const HomeBlogSection = dynamic(() => import('./_components/anime/HomeAnimeSection'), { loading: () => <SkeletonSpinner className="h-[50vh]" /> })

export default async function Home() {
  const { animes } = await getAnimes({ query: '', page: 1, totalAnimes: 12 })
  const { blogs } = await getBlogs({ query: '', page: 1, totalBlogs: 12 })

  return (
    <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-120px)]">
      <Intro />
        <HomeAnimeSection>
          {
            animes?.length ? (
              animes.map(anime => (
                <AnimeCard key={anime.id} anime={anime} home />
              ))
            ) : <h1 className="text-center">{"Couldn't"} fetch anime</h1>
          }
        </HomeAnimeSection>
        {/* <HomeBlogSection>
          {
            blogs?.length ? (
              blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} home />
              ))
            ) : <h1 className="text-center">{"Couldn't"} fetch anime</h1>
          }
        </HomeBlogSection> */}
    </div>
  );
}
