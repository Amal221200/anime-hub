import SectionContainer from "@/components/containers/SectionContainer"
import MoreButton from "@/components/MoreButton"
import { getAnimes } from "@/lib/actions/anime"
import { cn } from "@/lib/utils"
import AnimeCard from "./AnimeCard"
import HorizontalScrollableContainer from "@/components/HorizontalScrollableContainer"

interface HomeAnimeSectionProps {
    className?: string
}

const HomeAnimeSection = async ({ className, }: HomeAnimeSectionProps) => {
    const { animes } = await getAnimes({ query: '', page: 1, totalAnimes: 12 })
    
    return (
        <section className={cn('my-5', className)}>
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-semibold">{'Popular Anime'}</h2>
                <HorizontalScrollableContainer elements={13}>
                    {
                        !animes ? <h1 className="text-center">{"Couldn't"} fetch anime</h1> :
                            animes.length ? (
                                animes.map(anime => (
                                    <AnimeCard key={anime.id} anime={anime} home />
                                ))
                            ) : <h1 className="text-center">No animes yet</h1>
                    }
                    <MoreButton to="/anime" queryKey="fetch_animes" />
                </HorizontalScrollableContainer>
            </SectionContainer>
        </section>
    )
}

export default HomeAnimeSection