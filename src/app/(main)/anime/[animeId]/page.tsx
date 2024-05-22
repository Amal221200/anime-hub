
import { Metadata } from 'next'
import AnimeIntro from './_components/AnimeIntro'
import ReviewsSection from './_components/reviews'
import { getAnime } from '@/lib/actions/anime'
import { redirect } from 'next/navigation';

export async function generateMetadata({ params: { animeId } }: { params: { animeId: string } }): Promise<Metadata> {
    const anime = await getAnime(animeId);

    if (!anime) {
        redirect('/404')
    }

    return {
        title: `${anime.title}`,
        description: `${anime.description}`,
        keywords: [anime.title.toLowerCase(), ...anime.genre, anime.studio.toLowerCase(), anime.artist.toLowerCase()]
    }
}

const AnimePage = async ({ params: { animeId } }: { params: { animeId: string } }) => {

    return (
        <>
            <AnimeIntro animeId={animeId} />
            <ReviewsSection animeId={animeId} />
        </>
    )
}

export default AnimePage