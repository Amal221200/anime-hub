import { addAnime } from "@/seed";
import Intro from "./_components/Intro";
import AnimeSection from "./_components/AnimeSection";
import { getAnimes } from "@/lib/actions/anime";
import AnimeCard from "./_components/AnimeCard";


export default async function Home() {
  
  const animes = await getAnimes()

  return (
    <>
      <Intro />
      <AnimeSection>
        {
          !animes?.length ? "" : (
            animes.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))
          )
        }
      </AnimeSection>
    </>
  );
}
