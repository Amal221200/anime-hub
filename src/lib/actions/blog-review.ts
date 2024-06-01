"use server"
import db from "../db"

export async function getBlogReviews({ blogId, page = 1, totalReviews = false }: { blogId: string, page?: number, totalReviews?: number | boolean }) {
    const isLimit = typeof totalReviews === 'number' ? totalReviews : 0
    try {
        const reviews = await db.blogReview.findMany({
            where: { blogId, },
            include: { user: true },
            orderBy: { updatedAt: 'desc' },
            take: isLimit || undefined,
            skip: ((page - 1) * isLimit) || undefined
        });

        const reviewsLength = await db.blogReview.count({ where: { blogId } });
        const totalPages = Math.ceil(reviewsLength / isLimit)        
        return { reviews, totalPages, page }
    } catch (error) {
        console.log("GET REVIEWS ERROR");
        return { reviews: null, totalPages: 0, page: 0 }
    }
}


export async function addBlogReview(blogId: string, userId: string, review: string) {
    const user = await db.user.findUnique({ where: { externalUserId: userId } })
    if (!user) {
        return
    }
    const reviews = await db.blogReview.create({ data: { review, userId: user.id, blogId } });
    return reviews
}

export async function editBlogReview(id: string, review: string) {
    const reviews = await db.blogReview.update({ data: { review }, where: { id } });

    return reviews
}

export async function deleteBlogReview(id: string) {
    const reviews = await db.blogReview.delete({ where: { id } });

    return reviews
}