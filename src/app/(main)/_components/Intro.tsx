import SectionContainer from "@/components/containers/SectionContainer";
import IntroImage from "./intro-image";

const Intro = () => {
    return (
        <main className="my-3">
            <SectionContainer className="flex flex-col items-center justify-center gap-y-3 text-center">
                <IntroImage />
                
                <p className="text-sm sm:text-base">
                    {
                        "Anime Hub is your ultimate destination for all the animes! It's like having a treasure trove of all the animes at your fingertips. With Anime Hub, you can easily find information of all your favorite animes in one convenient place. Whether you're searching for the ongoing or classic shows, Anime Hub has got you covered. Say goodbye to endless Google searches and hello to seamless anime discovery. It's the go-to hub for all the otakus everywhere!"
                    }
                </p>
            </SectionContainer>
        </main>
    );
}

export default Intro;