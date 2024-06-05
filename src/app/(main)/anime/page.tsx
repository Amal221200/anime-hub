import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AnimeBody = dynamic(() => import('./_components/AnimeBody'), { ssr: true, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query ? `Results of ${query}` : "All Anime"
    }
}

const AnimesPage = ({ searchParams: { query } }: { searchParams: { query: string } }) => {

    return (
        <AnimeBody query={query} />
    )
}

export default AnimesPage