import SectionContainer from '@/components/containers/SectionContainer'
import { getBlog } from '@/lib/actions/blog'
import { redirect } from 'next/navigation'

const BlogContent = async ({ blogId }: { blogId: string }) => {
    const blog = await getBlog(blogId);

    if (!blog) {
        redirect("/404")
    }

    return (
        <main>
            <SectionContainer>
                <div className='space-y-3 prose-headings:font-semibold prose-h1:text-center prose-h1:text-4xl prose-h3:text-2xl prose-p:mb-6 prose-p:text-sm prose-img:mx-auto prose-img:my-4 prose-img:aspect-video prose-img:h-auto prose-img:w-[700px] prose-img:rounded prose-img:object-cover prose-img:object-bottom sm:prose-h1:text-6xl sm:prose-h3:text-2xl sm:prose-p:text-base'>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </div>
            </SectionContainer>
        </main>
    )
}

export default BlogContent