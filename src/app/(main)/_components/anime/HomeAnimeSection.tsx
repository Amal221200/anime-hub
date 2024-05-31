import SectionContainer from "@/components/containers/SectionContainer"
import MoreButton from "@/components/MoreButton"
import { cn } from "@/lib/utils"
import { ComponentProps } from "react"

interface HomeAnimeSectionProps extends ComponentProps<'div'> {

}

const HomeAnimeSection = ({ children, className, ...props }: HomeAnimeSectionProps) => {
    return (
        <section className={cn('my-5', className)} {...props}>
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-semibold">{'Popular Anime'}</h2>
                <div className="no-scrollbar grid grid-cols-[repeat(13,auto)] items-center gap-x-3 overflow-x-scroll">
                    {children}
                    <MoreButton to="/blog" queryKey="fetch_blogs" />
                </div>
            </SectionContainer>
        </section>
    )
}

export default HomeAnimeSection