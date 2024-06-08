import Link from "next/link";
import { ArrowUpRightSquare } from "lucide-react";
import Image from "next/image"
import { cn } from "@/lib/utils";
import { BlogType } from "@/lib/types";

interface BlogCardProps {
    blog: BlogType, home?: boolean
}

const BlogCard = ({ blog, home }: BlogCardProps) => {

    return (
        <article className={cn("group/anime relative h-[200px] overflow-hidden rounded-md border-destructive sm:h-[250px]", home && "sm:w-[350px] w-[280px]")}>
            <Image src={blog.imageLink} alt={blog.title} fill className="duration-[0.5] z-0 h-full w-full transform object-cover object-top transition group-hover/anime:scale-[1.2]" />

            {/* Overlay Content */}
            <div className="absolute inset-0 z-10 grid h-full w-full place-content-center space-y-1 bg-black/50 px-3 py-1 opacity-0 transition-all group-hover/anime:opacity-100 group-hover/anime:backdrop-blur-md">
                <div className="delay-[200ms] flex translate-y-[20%] transform flex-col items-center gap-2 text-center text-white opacity-0 transition-[all] duration-500 group-hover/anime:translate-y-0 group-hover/anime:opacity-100">
                    <h2 className="text-xl font-bold">{blog.title}</h2>
                    <h4 className="font-semibold">Author: {blog.author.username}</h4>
                    <Link href={`/blog/${blog.id}`} className="flex gap-2 border border-white px-2 py-1 transition-colors hover:rounded-lg hover:bg-white hover:text-black">Read More <ArrowUpRightSquare className="border-none" /></Link>
                </div>
            </div>
        </article>
    );
}

export default BlogCard;