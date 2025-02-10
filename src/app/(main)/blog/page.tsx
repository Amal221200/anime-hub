import dynamic from 'next/dynamic'
import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'

const BlogBody = dynamic(() => import('./_components/BlogBody'), { loading: () => <SkeletonSpinner className="h-[85vh]" /> })
const ScrollUpButton = dynamic(() => import("@/components/ScrollUpButton"));


export async function generateMetadata(props: { searchParams: Promise<{ [key: string]: string }> }): Promise<Metadata> {
  const searchParams = await props.searchParams;

  const {
    query
  } = searchParams;

  return {
    title: query ? `Search Results of ${query}` : "All Blogs"
  }
}

const BlogsPage = async (props: { searchParams: Promise<{ [key: string]: string }> }) => {
  const searchParams = await props.searchParams;

  const {
    query,
    fromYear,
    toYear
  } = searchParams;

  return (
    <>
      <BlogBody showHeading={!!(query || fromYear || toYear)} />
      <ScrollUpButton />
    </>
  )
}

export default BlogsPage