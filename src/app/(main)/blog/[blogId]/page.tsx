import { Metadata } from 'next'
import BlogContent from './_components/BlogContent'
import { notFound } from 'next/navigation';
import SkeletonSpinner from '@/components/loading/SkeletonSpinner';
import dynamic from 'next/dynamic';
import { getBlog } from '@/lib/actions/blog';
import BackgroundStyle from '@/components/styled-components/BackgroundStyle';

const ReviewsSection = dynamic(() => import('./_components/blog-reviews'), { loading: () => <SkeletonSpinner className='h-[50vh]' /> })

export async function generateMetadata({ params: { blogId } }: { params: { blogId: string } }): Promise<Metadata> {
    const blog = await getBlog(blogId);

    if (!blog) {
        return {
            title: 'Blog not found'
        }
    }

    return {
        title: `${blog.title}`,
        description: `${blog.description}`,
        keywords: [blog.title.toLowerCase(), blog.author.username.toLowerCase()]
    }
}

const BlogPage = async ({ params: { blogId } }: { params: { blogId: string } }) => {
    const blog = await getBlog(blogId);

    if (blog === undefined) {
        return <h1>There was a problem fetching from database</h1>
    }

    if (blog === null) {
        notFound()
    }

    return (
        <>
            <BackgroundStyle image={blog.imageLink} opacity={0.80} />
            <div>
                <BlogContent blog={blog} />
                <ReviewsSection blogId={blogId} />
            </div>
        </>
    )
}

export default BlogPage