import { getReviews } from "@/lib/actions/review";
import { getUser } from "@/lib/actions/user";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface ReviewParams {
    params: {
        animeId: string
    }
}

export async function GET(request: NextRequest, { params: { animeId } }: ReviewParams) {
    try {
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
        const { reviews, totalPages } = await getReviews({ animeId, page, totalReviews: 10 });

        return NextResponse.json({ reviews, totalPages })
    } catch (error) {
        console.log('GET REVIEWS API ERROR');
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}

export async function POST(request: NextRequest, { params: { animeId } }: ReviewParams) {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const { review } = await request.json();

        if (!review) {
            return NextResponse.json("Invalid values", { status: 402 })
        }

        const userData = await getUser(user.id);

        if (!userData) {
            return NextResponse.json("User not found", { status: 404 })
        }

        const newReview = await db.review.create({ data: { content: review, userId: userData.id, animeId } })

        return NextResponse.json(newReview, { status: 201 })
    } catch (error) {

    }
}

export async function PUT(request: NextRequest) {

}

export async function DELETE(request: NextRequest) {

}