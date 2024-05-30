import { deleteBlogReview, editBlogReview } from "@/lib/actions/blog-review";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

interface ReviewParams {
    params: {
        animeId: string,
        reviewId: string,
    }
}

export async function PUT(request: NextRequest, { params: { reviewId } }: ReviewParams) {
    try {

        const user = await currentUser()

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const { review }: { review: string } = await request.json();

        if (!review) {
            return NextResponse.json("Review is required", { status: 400 })
        }

        const updatedReview = await editBlogReview(reviewId, review)

        return NextResponse.json(updatedReview)
    } catch (error) {
        return NextResponse.json("Internal Server Error at PUT Review [reviewId]", { status: 500 })
    }
}

export async function DELETE(request: NextRequest, { params: { reviewId } }: ReviewParams) {
    try {
        const user = await currentUser()

        if (!user) {
            return NextResponse.json("Unauthorized", { status: 401 })
        }

        const deletedReview = await deleteBlogReview(reviewId);

        return NextResponse.json(deletedReview)
    } catch (error) {
        return NextResponse.json("Internal Server Error at DELETE Review [reviewId]", { status: 500 })
    }
}