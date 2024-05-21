"use server"

import db from "../db"

export async function getReviews({ animeId, page = 1, totalReviews = false }: { animeId: string, page?: number, totalReviews?: number | boolean }) {
    const isLimit = typeof totalReviews === 'number' ? totalReviews : 0
    try {
        const reviews = await db.review.findMany({
            where: { animeId },
            include: { user: true },
            orderBy: { updatedAt: 'desc' },
            take: isLimit || undefined,
            skip: ((page - 1) * isLimit) || undefined
        });

        const reviewsLength = await db.review.count({ where: { animeId } });
        const totalPages = Math.ceil(reviewsLength / isLimit)
        return { reviews, totalPages }
    } catch (error) {
        console.log("GET REVIEWS ERROR");
        return { reviews: null, totalPages: 0 }
    }
}
export async function addReview(animeId: string, userId: string) {
    const reviews = await db.review.findMany({ where: { animeId }, include: { user: true } });

    return reviews
}