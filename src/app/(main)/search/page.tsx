import { getAnimes } from '@/lib/actions/anime'
import React from 'react'
import AnimeSection from '../_components/AnimeSection';
import AnimeCard from '../_components/AnimeCard';

const SearchPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    const animes = await getAnimes(query)

    return (
        <AnimeSection heading={`Results of ${query}`} className='min-h-[calc(100dvh-160px)]'>
            {animes?.length ? animes.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
            )) : <h1>No match found for {query}</h1>}
        </AnimeSection>
    )
}

export default SearchPage