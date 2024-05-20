import SectionContainer from "@/components/containers/SectionContainer"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CircleArrowRight } from "lucide-react"
import Link from "next/link"
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
                    <Button variant="ghost" type="button" size="icon" className="rounded-full" asChild>
                        <Link href="/anime">
                            <CircleArrowRight />
                        </Link>
                    </Button>
                </div>
            </SectionContainer>
        </section>
    )
}

export default HomeAnimeSection