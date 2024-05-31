"use server"

import db from "../db"

export async function getAnimeReviews({ animeId, page = 1, totalReviews = false }: { animeId: string, page?: number, totalReviews?: number | boolean }) {
    const isLimit = typeof totalReviews === 'number' ? totalReviews : 0
    try {
        const reviews = await db.animeReview.findMany({
            where: { animeId },
            include: { user: true },
            orderBy: { updatedAt: 'desc' },
            take: isLimit || undefined,
            skip: ((page - 1) * isLimit) || undefined
        });

        const reviewsLength = await db.animeReview.count({ where: { animeId } });
        const totalPages = Math.ceil(reviewsLength / isLimit)
        return { reviews, totalPages }
    } catch (error) {
        console.log("GET REVIEWS ERROR");
        return { reviews: null, totalPages: 0 }
    }
}

export async function addAnimeReview(review: string, userId: string, animeId: string,) {
    const reviews = await db.animeReview.create({ data: { review, userId, animeId } });

    return reviews
}

export async function editAnimeReview(id: string, review: string) {
    const reviews = await db.animeReview.update({ data: { review }, where: { id } });

    return reviews
}

export async function deleteAnimeReview(id: string) {
    const reviews = await db.animeReview.delete({ where: { id } });

    return reviews
}