
import AnimeIntro from './_components/AnimeIntro'
import ReviewsSection from './_components/reviews'

const AnimePage = async ({ params:{animeId} }: { params: { animeId: string } }) => {


    return (
        <div className='min-h-[calc(100dvh-160px)]'>
            <AnimeIntro animeId={animeId} />
            <ReviewsSection animeId={animeId} />
        </div>
    )
}

export default AnimePage