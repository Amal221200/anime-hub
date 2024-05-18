import { getAnimes } from '@/lib/actions/anime'
import React from 'react'
import AnimeSection from '../_components/AnimeSection';
import AnimeCard from '../_components/AnimeCard';

const SearchPage = async ({ searchParams: { query } }: { searchParams: { query: string } }) => {
    console.log(query);

    const animes = await getAnimes(query)

    // console.log(animes);
    return (
        <AnimeSection heading={`Results of ${query}`}>
            {animes?.length ? animes.map((anime) => (
                // <Suspense key={anime._id} >
                <AnimeCard key={anime.id} anime={anime} />
                // </Suspense>
            )) : <h1>No match found for {query}</h1>}
        </AnimeSection>
    )
}

export default SearchPage