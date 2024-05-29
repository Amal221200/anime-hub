import SkeletonSpinner from '@/components/SkeletonSpinner'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const AnimeSection = dynamic(() => import('./_components/AnimeSection'), { ssr: false, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query ? `Results of ${query}` : "All Anime"
    }
}

const AnimesPage = ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    return (
        <AnimeSection
            heading={query ? `Results of ${query}` : 'All Animes'} searchQuery={query} className='min-h-[calc(100dvh-160px)]' />
    )
}

export default AnimesPage