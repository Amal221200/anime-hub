import Link from "next/link";
import { ArrowUpRightSquare } from "lucide-react";
import Image from "next/image"
import { Anime } from "@prisma/client";
import { cn } from "@/lib/utils";
import dateFormatter from "@/utils/dateFormatter";

interface AnimeCardProps {
    anime: Anime, home?: boolean
}

const AnimeCard = ({ anime, home }: AnimeCardProps) => {

    return (
        <article className={cn("group/anime relative h-[200px] overflow-hidden rounded-md border-destructive sm:h-[250px]", home && "sm:w-[350px] w-[280px]")}>
            <Image src={anime.imageLink} draggable={false} alt={anime.title} fill className="duration-500 z-0 h-full w-full transform object-cover object-top transition group-hover/anime:scale-[1.2]" />

            {/* Overlay Content */}
            <div className="absolute inset-0 pointer-events-none group-hover/anime:pointer-events-auto z-10 grid h-full w-full place-content-center space-y-1 bg-black/50 px-3 py-1 opacity-0 transition-all group-hover/anime:opacity-100 group-hover/anime:backdrop-blur-md">
                <div className="delay-200 flex translate-y-[20%] transform flex-col items-center gap-2 text-center text-white opacity-0 transition-[all] duration-500 group-hover/anime:translate-y-0 group-hover/anime:opacity-100">
                    <h2 className="text-xl font-bold">{anime.title}</h2>
                    <h4 className="font-semibold">Artist: {anime.artist}</h4>
                    <p className="text-sm font-semibold">
                        <span>{dateFormatter(anime.release)}</span> | <span className={cn('border-2 rounded p-[2px]', anime.status === 'ONGOING'?'text-orange-400 border-orange-500':'text-emerald-500 border-emerald-500')}>{anime.status}</span>
                    </p>
                    <Link href={`/anime/${anime.id}`} title={`Visit the page for ${anime.title}`} className="flex gap-2 border border-white px-2 py-1 transition-colors hover:rounded-lg hover:bg-white hover:text-black">Read More <ArrowUpRightSquare className="border-none" /></Link>
                </div>
            </div>
        </article>
    );
}

export default AnimeCard;