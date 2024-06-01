import { getAnimeReviews, addAnimeReview } from "@/lib/actions/anime-review";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface ReviewParams {
    params: {
        animeId: string
    }
}

export async function GET(request: NextRequest, { params: { animeId } }: ReviewParams) {
    try {
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
        const { reviews, totalPages } = await getAnimeReviews({ animeId, page, totalReviews: 5 });

        return NextResponse.json({ reviews, totalPages, page })
    } catch (error) {
        console.log('GET REVIEWS API ERROR');
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}

export async function POST(request: NextRequest, { params: { animeId } }: ReviewParams) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const { review }: { review: string } = await request.json();

        if (!review) {
            return NextResponse.json("Invalid values", { status: 402 })
        }

        const newReview = await addAnimeReview(review, user.id, animeId)

        return NextResponse.json(newReview, { status: 201 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at POST REVIEW", { status: 500 })
    }
}
