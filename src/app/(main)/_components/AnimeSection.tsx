import SectionContainer from "@/components/containers/SectionContainer"
import { ReactNode } from "react";


const AnimeSection = ({ children, heading }: { children: ReactNode, heading?: string }) => {
    // console.log(heading);
    return (
        <section className="my-5">
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-bold">{heading || 'Popular Anime'}</h2>
                <div className="grid items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            </SectionContainer>
        </section>);
}

export default AnimeSection;