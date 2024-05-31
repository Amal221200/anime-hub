import React from 'react'
import { redirect } from 'next/navigation'
import dynamic from 'next/dynamic'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import { Metadata } from 'next'

const BlogBody = dynamic(() => import('./_components/BlogBody'), { ssr: false, loading: () => <SkeletonSpinner className="h-[85vh]" /> })

export async function generateMetadata({ searchParams: { query } }: { searchParams: { query: string } }): Promise<Metadata> {
    return {
        title: query === 'all' ? "All Anime" : `Results of ${query}`
    }
}

const BlogsPage = ({ searchParams: { query } }: { searchParams: { query: string } }) => {

  if (!query) {
    redirect('/blog?query=all')
  }

  return (
    <div>
      <BlogBody query={query} />
    </div>
  )
}

export default BlogsPage