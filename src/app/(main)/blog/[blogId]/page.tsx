import { Metadata } from 'next'
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import BlogContent from './_components/BlogContent'
import SkeletonSpinner from '@/components/loading/SkeletonSpinner';
import { getBlog } from '@/lib/actions/blog';
import BackgroundStyle from '@/components/styled-components/BackgroundStyle';
import { APP_URL, defaultOpenGraph } from '@/lib/metadata';

const ReviewsSection = dynamic(() => import('./_components/blog-reviews'), { loading: () => <SkeletonSpinner className='h-[50vh]' /> })

export async function generateMetadata(props: { params: Promise<{ blogId: string }> }): Promise<Metadata> {
    const params = await props.params;

    const {
        blogId
    } = params;

    const blog = await getBlog(blogId);

    if (!blog) {
        return {
            title: 'Blog not found'
        }
    }

    return {
        title: `${blog.title}`,
        description: `${blog.description}`,
        keywords: [blog.title.toLowerCase(), blog.author.username.toLowerCase()],
        openGraph: {
            ...defaultOpenGraph,
            url: `${APP_URL}/blog/${blog.id}`,
            title: `${blog.title}`,
            description: `${blog.description}`,
            images: [{ url: blog.imageLink }],
            type: 'article'
        }
    }
}

const BlogPage = async (props: { params: Promise<{ blogId: string }> }) => {
    const params = await props.params;

    const {
        blogId
    } = params;

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