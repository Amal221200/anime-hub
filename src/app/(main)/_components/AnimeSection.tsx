import SectionContainer from "@/components/containers/SectionContainer"
import { cn } from "@/lib/utils";
import { ComponentProps, ReactNode } from "react";

interface AnimeSectionProps extends ComponentProps<'div'> {
    heading?: string;
}
const AnimeSection = ({ children, heading, className }: AnimeSectionProps) => {
    return (
        <section className={cn("my-5", className)}>
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-semibold">{heading || 'Popular Anime'}</h2>
                <div className="grid grid-cols-1 items-center justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {children}
                </div>
            </SectionContainer>
        </section>
    );
}

export default AnimeSection;