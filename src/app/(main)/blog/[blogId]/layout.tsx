import BackgroundStyle from '@/components/providers/BackgroundStyle';
import { getBlog } from '@/lib/actions/blog'
import React, { ReactNode } from 'react'

const BlogPageLayout = async ({ children, params }: { children: ReactNode, params: { blogId: string } }) => {
    const blog = await getBlog(params.blogId);
    if (!blog) {
        return
    }
    return (
        <>
            <BackgroundStyle image={blog.imageLink} opacity={0.80} />
            {children}
        </>
    )
}

export default BlogPageLayout