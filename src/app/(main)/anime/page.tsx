import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import db from '@/lib/db'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AnimeBody = dynamic(() => import('./_components/AnimeBody'), { ssr: true, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query ? `Search Results` : "All Animes"
    }
}

const AnimesPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    const artists = await db.anime.findMany({ select: { artist: true }, orderBy: { artist: 'asc' }, distinct: 'artist' })
    const studios = await db.anime.findMany({ select: { studio: true }, orderBy: { studio: 'asc' }, distinct: 'studio' })
    const genresData = await db.anime.findMany({ select: { genre: true }, orderBy: { genre: 'asc' }, distinct: 'genre' })
    const genres = Array.from(new Set((genresData.map(({ genre }) => genre)).flat()))
    
    return (
        <AnimeBody query={query} artists={artists} studios={studios} genres={genres} />
    )
}

export default AnimesPage