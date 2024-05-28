import SectionContainer from '@/components/containers/SectionContainer'
import { getAnime } from '@/lib/actions/anime'
import { cn } from '@/lib/utils'
import dateFormatter from '@/utils/dateFormatter'
import { CirclePlay } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const AnimeIntro = async ({ animeId }: { animeId: string }) => {
    const anime = await getAnime(animeId);

    if (!anime) {
        redirect("/404")
    }

    return (
        <main>
            <SectionContainer>
                <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
                    <div className="relative h-[250px] flex-grow-[1] overflow-hidden rounded-md sm:h-[350px] md:h-[400px] md:w-[350px] md:flex-grow-[2] md:basis-2">
                        <Image src={anime.imageLink} fill alt={anime.title} className="h-full w-full object-cover object-center" />
                    </div>
                    <div className="flex w-full flex-grow-[1] flex-col justify-between md:basis-2">
                        <h1 className="mb-3 text-3xl font-bold">{anime.title}</h1>
                        <ul className="space-y-1 py-3 text-sm sm:space-y-2 sm:text-base">
                            <li><strong>Studio:</strong> {anime.studio}</li>
                            <li><strong>Artist:</strong> {anime.artist}</li>
                            <li>
                                <strong>Release:</strong> {dateFormatter(anime.release)} |&nbsp;
                                <small className={cn('font-medium', anime.status === 'COMPLETED' ? 'text-emerald-500' : 'text-orange-500')}>
                                    {anime.status}
                                </small>
                            </li>
                            <li><strong>Episodes:</strong> {anime.episodes} | <strong>Duration: </strong> {anime.episodeDuration} mins</li>
                            <li><strong>Genre:</strong> {anime.genre?.map((ele) => `${ele[0].toUpperCase()}${ele.slice(1)}`).join(", ")}</li>
                            <li className="flex items-center gap-2">
                                <Link href={anime.watchLink} target="_blank" className="rounded-md bg-emerald-400 px-2 py-1 text-black transition-all hover:bg-emerald-500">
                                    Watch Anime <CirclePlay className="inline" size={18} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="my-5 text-sm sm:text-base">
                    <p>{anime.description}</p>
                </div>
            </SectionContainer>
        </main>
    )
}

export default AnimeIntro