import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const AnimeBody = dynamic(() => import('./_components/AnimeBody'), { ssr: true, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query === 'all' ? "All Anime" : `Results of ${query}`
    }
}

const AnimesPage = ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    if (!query) {
        redirect('/anime?query=all')
    }

    return (
        <AnimeBody query={query} />
    )
}

export default AnimesPage