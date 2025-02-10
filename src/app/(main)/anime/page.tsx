import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import db from '@/lib/db'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AnimeBody = dynamic(() => import('./_components/AnimeBody'), { loading: () => <SkeletonSpinner className="h-[85vh]" /> })
const ScrollUpButton = dynamic(() => import("@/components/ScrollUpButton"));

export async function generateMetadata(props: { searchParams: Promise<{ [key: string]: string }> }): Promise<Metadata> {
    const searchParams = await props.searchParams;

    const {
        query
    } = searchParams;

    return {
        title: query ? `Search Results of ${query}` : "All Animes"
    }
}

const AnimesPage = async (props: { searchParams: Promise<{ [key: string]: string }> }) => {
    const searchParams = await props.searchParams;

    const {
        query,
        fromYear,
        toYear,
        status,
        artist,
        studio,
        genre
    } = searchParams;

    const artists = await db.anime.findMany({ select: { artist: true }, orderBy: { artist: 'asc' }, distinct: 'artist' })
    const studios = await db.anime.findMany({ select: { studio: true }, orderBy: { studio: 'asc' }, distinct: 'studio' })
    const genresData = await db.anime.findMany({ select: { genre: true }, orderBy: { genre: 'asc' }, distinct: 'genre' })
    const genres = Array.from(new Set((genresData.map(({ genre }) => genre)).flat())).toSorted()

    return (
        <>
            <AnimeBody showHeading={!!(query || fromYear || toYear || status || artist || studio || genre)} artists={artists} studios={studios} genres={genres} />
            <ScrollUpButton />
        </>
    )
}

export default AnimesPage