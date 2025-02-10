import { Metadata } from 'next'
import AnimeIntro from './_components/AnimeIntro'
import { getAnime } from '@/lib/actions/anime'
import { notFound } from 'next/navigation';
import SkeletonSpinner from '@/components/loading/SkeletonSpinner';
import dynamic from 'next/dynamic';
import BackgroundStyle from '@/components/styled-components/BackgroundStyle';
import { APP_URL, defaultOpenGraph } from '@/lib/metadata';

const ReviewsSection = dynamic(() => import('./_components/anime-reviews'), { loading: () => <SkeletonSpinner className='h-[50vh]' /> })

export async function generateMetadata(props: { params: Promise<{ animeId: string }> }): Promise<Metadata> {
    const params = await props.params;

    const {
        animeId
    } = params;

    const anime = await getAnime(animeId);

    if (!anime) {
        return {
            title: 'Anime not found'
        }
    }

    return {
        title: `${anime.title}`,
        description: `${anime.description}`,
        keywords: [anime.title.toLowerCase(), ...anime.genre, anime.studio.toLowerCase(), anime.artist.toLowerCase()],
        openGraph: {
            ...defaultOpenGraph,
            url: `${APP_URL}/anime/${anime.id}`,
            title: `${anime.title}`,
            description: `${anime.description}`,
            images: [{url: anime.imageLink}],
            type:'article'
        }
    }
}

const AnimePage = async (props: { params: Promise<{ animeId: string }> }) => {
    const params = await props.params;

    const {
        animeId
    } = params;

    const anime = await getAnime(animeId);

    if (anime === undefined) {
        return <h1>There was a problem fetching from database.</h1>
    }

    if (anime === null) {
        notFound()
    }

    return (
        <>
            <BackgroundStyle image={anime.imageLink} opacity={0.86} />
            <div>
                <AnimeIntro anime={anime} />
                <ReviewsSection animeId={animeId} />
            </div>
        </>
    )
}

export default AnimePage