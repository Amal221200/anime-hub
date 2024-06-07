import { ReactNode } from 'react'
import { getAnime } from '@/lib/actions/anime'
import BackgroundStyle from '@/components/providers/BackgroundStyle';

const AnimePageLayout = async ({ children, params }: { children: ReactNode, params: { animeId: string } }) => {
    const anime = await getAnime(params.animeId);
    
    if (!anime) {
        return
    }
    return (
        <>
            <BackgroundStyle image={anime.imageLink} opacity={0.86} />
            {children}
        </>
    )
}

export default AnimePageLayout