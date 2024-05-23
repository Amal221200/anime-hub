import { lazy, Suspense } from "react";
import Intro from "./_components/Intro";
import { getAnimes } from "@/lib/actions/anime";
import AnimeCard from "./_components/AnimeCard";
import SkeletonSpinner from "@/components/SkeletonSpinner";

const HomeAnimeSection = lazy(() => import('./_components/HomeAnimeSection'))

export default async function Home() {
  const { animes } = await getAnimes({ query: '', page: 1, totalAnimes: 12 })

  return (
    <div className="min-h-[calc(100vh-160px)] sm:min-h-[calc(100vh-120px)]">
      <Intro />
      <Suspense fallback={<SkeletonSpinner className="h-[50vh]" />}>
        <HomeAnimeSection className="">
          {
            animes?.length ? (
              animes.map(anime => (
                <AnimeCard key={anime.id} anime={anime} home />
              ))
            ) : <h1 className="text-center">{"Couldn't"} fetch anime</h1>
          }
        </HomeAnimeSection>
      </Suspense>
    </div>
  );
}
