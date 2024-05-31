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
                <div className='space-y-3 prose-headings:font-semibold prose-h1:text-center prose-h1:text-4xl prose-h3:text-2xl prose-img:mx-auto' dangerouslySetInnerHTML={{ __html: blog.content }} />
            </SectionContainer>
        </main>
    )
}

export default BlogContent