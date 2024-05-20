import AnimeSection from '../_components/AnimeSection'

const AnimesPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {

    return (
        <AnimeSection heading={query ? `Results of ${query}` : 'All Animes'} query={query} className='min-h-[calc(100dvh-160px)]' />
    )
}

export default AnimesPage