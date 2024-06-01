import { Metadata } from 'next'
import BlogContent from './_components/BlogContent'
import { redirect } from 'next/navigation';
import SkeletonSpinner from '@/components/loading/SkeletonSpinner';
import dynamic from 'next/dynamic';
import { getBlog } from '@/lib/actions/blog';

const ReviewsSection = dynamic(() => import('./_components/blog-reviews'), { loading: () => <SkeletonSpinner className='h-[50vh]' /> })

export async function generateMetadata({ params: { blogId } }: { params: { blogId: string } }): Promise<Metadata> {
    const blog = await getBlog(blogId);

    if (!blog) {
        redirect('/404')
    }

    return {
        title: `${blog.title}`,
        description: `${blog.description}`,
        keywords: [blog.title.toLowerCase(), blog.author.username.toLowerCase()]
    }
}

const BlogPage = async ({ params: { blogId } }: { params: { blogId: string } }) => {

  return (
      <div className='min-h-screen'>
          <BlogContent blogId={blogId} />
          <ReviewsSection blogId={blogId} />
      </div>
  )
}

export default BlogPage