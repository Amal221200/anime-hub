import { getAnimes } from "@/lib/actions/anime";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const query = request.nextUrl.searchParams.get('query')
        const page = parseInt(request.nextUrl.searchParams.get('page') || '0')
        const { animes, totalPages } = await getAnimes({ query: query || 'all', page, totalAnimes: 12 })
        return NextResponse.json({ animes, totalPages, page }, { status: 200 })
    } catch (error) {
        console.log("GET ANIME API");
        return NextResponse.json("Internal server error", { status: 500 })
    }
}