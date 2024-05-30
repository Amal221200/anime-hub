import { getBlogs } from "@/lib/actions/blog";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('query')
        const page = parseInt(request.nextUrl.searchParams.get('page') || '0')
        const { blogs, totalPages } = await getBlogs({ query: query || 'all', page, totalBlogs: 12 })
        return NextResponse.json({ blogs, totalPages, page }, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal server error", { status: 500 })
    }
}