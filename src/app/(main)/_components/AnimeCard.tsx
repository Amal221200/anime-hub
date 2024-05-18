import Link from "next/link";
import { ArrowUpRightSquare } from "lucide-react";
import Image from "next/image"
import { Anime } from "@prisma/client";

interface AnimeCardProps {
    anime: Anime
}

const AnimeCard = ({ anime }: AnimeCardProps) => {

    return (
        <article className="group/anime relative h-[200px] overflow-hidden rounded-md bg-gray-300 sm:h-[250px]">
            <Image src={anime.imageLink} alt={anime.title} fill className="duration-[0.5] z-0 h-full w-full transform object-cover object-top transition group-hover/anime:scale-[1.2]" />
            <div className="absolute inset-0 z-10 grid h-full w-full place-content-center space-y-1 bg-black/50 px-3 py-1 opacity-0 transition-all group-hover/anime:opacity-100 group-hover/anime:backdrop-blur-md">
                <div className="delay-[200ms] flex translate-y-[20%] transform flex-col items-center gap-2 text-center text-white opacity-0 transition-[all] duration-500 group-hover/anime:translate-y-0 group-hover/anime:opacity-100">
                    <h2 className="text-xl font-bold">{anime.title}</h2>
                    <h4 className="font-semibold">Artist: {anime.artist}</h4>
                    <Link href={`/anime/${anime.id}`} className="flex gap-2 border border-white px-2 py-1 transition-colors hover:rounded-lg hover:bg-white hover:text-black">Read More <ArrowUpRightSquare className="border-none" /></Link>
                </div>
            </div>
        </article>
    );
}

export default AnimeCard;