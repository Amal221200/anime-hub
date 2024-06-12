import React from 'react'
import dynamic from 'next/dynamic'
import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'

const BlogBody = dynamic(() => import('./_components/BlogBody'), { ssr: false, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { [key: string]: string } }): Promise<Metadata> {
  return {
    title: query ? `Search Results` : "All Blogs"
  }
}

const BlogsPage = ({ searchParams: { query, fromYear, toYear } }: { searchParams: { [key: string]: string } }) => {

  return (
    <div>
      <BlogBody showHeading={!!(query || fromYear || toYear)} />
    </div>
  )
}

export default BlogsPage