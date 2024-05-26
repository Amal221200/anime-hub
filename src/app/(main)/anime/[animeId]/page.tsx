import { Metadata } from 'next'
import AnimeIntro from './_components/AnimeIntro'
import { getAnime } from '@/lib/actions/anime'
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import SkeletonSpinner from '@/components/SkeletonSpinner';
import dynamic from 'next/dynamic';

const ReviewsSection = dynamic(() => import('./_components/reviews'))

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
        <div className='min-h-screen'>
            <AnimeIntro animeId={animeId} />
            <Suspense fallback={<SkeletonSpinner className='h-[50vh]' />}>
                <ReviewsSection animeId={animeId} />
            </Suspense>
        </div>
    )
}

export default AnimePage