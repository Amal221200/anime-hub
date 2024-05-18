import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface SectionContainerProps extends ComponentProps<'div'> {

}

const SectionContainer = ({ children, className }: SectionContainerProps) => {
    return (
        <div className={cn("lg:max-w-[80vw] max-w-[90vw] mx-auto px-3", className)}>
            {children}
        </div>
    );
}

export default SectionContainer;