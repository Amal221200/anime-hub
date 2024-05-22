import { Metadata } from 'next'
import AnimeSection from './_components/AnimeSection'

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query ? `Results of ${query}` : "All Anime"
    }
}

const AnimesPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    return (
        <AnimeSection
            heading={query ? `Results of ${query}` : 'All Animes'} searchQuery={query} className='min-h-[calc(100dvh-160px)]' />
    )
}

export default AnimesPage