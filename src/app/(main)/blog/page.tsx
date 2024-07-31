import dynamic from 'next/dynamic'
import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'

const BlogBody = dynamic(() => import('./_components/BlogBody'), { ssr: false, loading: () => <SkeletonSpinner className="h-[85vh]" /> })
const ScrollUpButton = dynamic(() => import("@/components/ScrollUpButton"), {ssr: false});


export async function generateMetadata({ searchParams: { query } }: { searchParams: { [key: string]: string } }): Promise<Metadata> {
  return {
    title: query ? `Search Results of ${query}` : "All Blogs"
  }
}

const BlogsPage = ({ searchParams: { query, fromYear, toYear } }: { searchParams: { [key: string]: string } }) => {

  return (
    <>
      <BlogBody showHeading={!!(query || fromYear || toYear)} />
      <ScrollUpButton />
    </>
  )
}

export default BlogsPage