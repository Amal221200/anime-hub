import SectionContainer from "@/components/containers/SectionContainer"
import MoreButton from "@/components/MoreButton"
import { getBlogs } from "@/lib/actions/blog"
import { cn } from "@/lib/utils"
import BlogCard from "./BlogCard"
import HorizontalScrollableContainer from "@/components/HorizontalScrollableContainer"

interface HomeBlogSectionProps {
    className?: string,
}

const HomeBlogSection = async ({ className }: HomeBlogSectionProps) => {
    const { blogs } = await getBlogs({ query: '', page: 1, totalBlogs: 12 })

    return (
        <section className={cn('my-5', className)}>
            <SectionContainer>
                <h2 className="mb-3 text-3xl font-semibold">{'Latest Blogs'}</h2>
                <HorizontalScrollableContainer elements={13}>
                    {
                        !blogs ? <h1 className="text-center">{"Couldn't"} fetch blogs</h1> :
                            blogs.length ? (
                                blogs.map(blog => (
                                    <BlogCard key={blog.id} blog={blog} home />
                                ))
                            ) : <h1 className="text-center">No blogs yet</h1>
                    }
                    <MoreButton to="/blog" queryKey="fetch_blogs" />
                </HorizontalScrollableContainer>
            </SectionContainer>
        </section>
    )
}

export default HomeBlogSection