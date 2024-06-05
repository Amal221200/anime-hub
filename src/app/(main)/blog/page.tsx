import React from 'react'
import dynamic from 'next/dynamic'
import SkeletonSpinner from '@/components/loading/SkeletonSpinner'
import { Metadata } from 'next'

const BlogBody = dynamic(() => import('./_components/BlogBody'), { ssr: false, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query  ? `Results of ${query}` : "All Anime"
    }
}

const BlogsPage = ({ searchParams: { query } }: { searchParams: { query: string } }) => {

  return (
    <div>
      <BlogBody query={query} />
    </div>
  )
}

export default BlogsPage