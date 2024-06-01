import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const ItemLoading = ({ home }: { home: boolean }) => {
    return <Skeleton
        className={cn("group/anime relative h-[200px] overflow-hidden rounded-md border-destructive sm:h-[250px]", home && "sm:w-[350px] w-[280px]")}
    />
}

export default ItemLoading