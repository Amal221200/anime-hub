import { addBlogReview, getBlogReviews } from "@/lib/actions/blog-review";
import { getUser } from "@/lib/actions/user";
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface ReviewParams {
    params: {
        blogId: string
    }
}

export async function GET(request: NextRequest, { params: { blogId } }: ReviewParams) {
    try {
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1')
        const { blogReviews, totalPages } = await getBlogReviews({ blogId, page, totalReviews: 10 });

        return NextResponse.json({ blogReviews, totalPages })
    } catch (error) {
        console.log('GET REVIEWS API ERROR');
        return NextResponse.json("Internal Server Error", { status: 500 })
    }
}

export async function POST(request: NextRequest, { params: { blogId } }: ReviewParams) {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const { review }: { review: string } = await request.json();

        if (!review) {
            return NextResponse.json("Invalid values", { status: 402 })
        }

        const userData = await getUser(user.id);

        if (!userData) {
            return NextResponse.json("User not found", { status: 404 })
        }

        const newReview = await addBlogReview(blogId, user.id, review)

        return NextResponse.json(newReview, { status: 201 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at POST REVIEW", { status: 500 })
    }
}
