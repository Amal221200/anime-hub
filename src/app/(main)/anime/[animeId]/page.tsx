
import AnimeIntro from './_components/AnimeIntro'
import ReviewsSection from './_components/reviews'

const AnimePage = async ({ params:{animeId} }: { params: { animeId: string } }) => {


    return (
        <>
            <AnimeIntro animeId={animeId} />
            <ReviewsSection animeId={animeId} />
        </>
    )
}

export default AnimePage