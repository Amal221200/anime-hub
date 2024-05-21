"use server"

import db from "../db"

export async function getReviews(animeId: string) {
    const reviews = await db.review.findMany({ where: { animeId }, include: { user: true }, orderBy: { updatedAt: 'desc' } });

    return reviews
}
export async function addReview(animeId: string, userId: string) {
    const reviews = await db.review.findMany({ where: { animeId }, include: { user: true } });

    return reviews
}